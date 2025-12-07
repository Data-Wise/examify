-- QTI Export Filter for Quarto Exam Extension
-- Generates Canvas-compatible QTI XML from parsed questions

local questions = {}
local current_section = "Main"
local quiz_title = ""
local default_points = 2

-- Utility: Generate hash ID
local function generate_id(seed)
  local hash = ""
  for i = 1, 32 do
    hash = hash .. string.format("%02x", (seed:byte(i % #seed + 1) + i * 17) % 256)
  end
  return hash
end

-- Utility: Escape XML
local function escape_xml(text)
  return text:gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;")
end

-- Parse question header
local function parse_question(text)
  local num, qtext, pts = text:match("^(%d+)%.%s+(.-)%s*%[(%d+)%s*pts?%]")
  if num then
    return {number = tonumber(num), text = qtext, points = tonumber(pts)}
  end
  local num2, qtext2 = text:match("^(%d+)%.%s+(.+)")
  if num2 then
    return {number = tonumber(num2), text = qtext2, points = default_points}
  end
  return nil
end

-- Parse T/F answer from header
local function parse_tf_answer(text)
  local answer = text:match("→%s*(%w+)$")
  if answer then
    return answer:lower() == "true"
  end
  return nil
end

-- Collect metadata
function Meta(meta)
  if meta.title then
    quiz_title = pandoc.utils.stringify(meta.title)
  end
  if meta.exam and meta.exam["default-points"] then
    default_points = tonumber(pandoc.utils.stringify(meta.exam["default-points"])) or 2
  end
end

-- Collect section headers
function Header(el)
  if el.level == 1 then
    local text = pandoc.utils.stringify(el.content)
    if text:match("^Section:%s*") then
      current_section = text:gsub("^Section:%s*", "")
    end
  end
  return el
end

-- Generate QTI at end of document
function Pandoc(doc)
  local output_format = PANDOC_STATE and PANDOC_STATE.output_file
  
  -- Only generate QTI if requested
  if not (quarto and quarto.doc and quarto.doc.meta and 
          quarto.doc.meta.exam and quarto.doc.meta.exam.output == "qti") then
    return doc
  end
  
  -- Build QTI XML
  local qti_items = ""
  for _, q in ipairs(questions) do
    local item_id = generate_id(quiz_title .. q.number)
    -- QTI item generation would go here
  end
  
  -- Write QTI file
  local qti = '<?xml version="1.0" encoding="UTF-8"?>' ..
    '<questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2">' ..
    '<assessment ident="' .. generate_id(quiz_title) .. '" title="' .. escape_xml(quiz_title) .. '">' ..
    '<section ident="root_section">' ..
    qti_items ..
    '</section></assessment></questestinterop>'
  
  return doc
end

return {
  {Meta = Meta},
  {Header = Header},
  {Pandoc = Pandoc}
}
