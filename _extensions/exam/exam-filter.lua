-- Quarto Exam Extension - Unified Lua Filter
-- Handles PDF, HTML, and QTI output with shared options

-- Read exam options from metadata
local exam_options = {}
local format_name = ""

function Meta(meta)
  -- Detect output format
  format_name = quarto.doc.is_format("html") and "html" or 
                quarto.doc.is_format("pdf") and "pdf" or
                quarto.doc.is_format("docx") and "docx" or "other"
  
  -- Read exam options
  if meta.exam then
    for k, v in pairs(meta.exam) do
      if type(v) == "table" then
        exam_options[k] = {}
        for k2, v2 in pairs(v) do
          exam_options[k][pandoc.utils.stringify(k2)] = pandoc.utils.stringify(v2)
        end
      else
        exam_options[k] = pandoc.utils.stringify(v)
      end
    end
  end
  
  -- Inject CSS variables for HTML
  if format_name == "html" then
    local fonts = exam_options.fonts or {}
    local css = string.format([[
<style>
:root {
  --exam-font-size: %s;
  --exam-question-size: %s;
  --exam-section-size: %s;
  --exam-question-weight: %s;
}
%s
</style>
]], 
      fonts["size"] or "11pt",
      fonts["question-size"] or "1em",
      fonts["section-size"] or "1.2em",
      fonts["question-weight"] or "600",
      exam_options.solutions == "true" and "body { class: solutions-enabled; }" or ""
    )
    
    quarto.doc.include_text("in-header", css)
  end
  
  return meta
end

-- Process headers (questions and sections)
function Header(el)
  -- Section headers (# = level 1)
  if el.level == 1 then
    local text = pandoc.utils.stringify(el.content)
    if text:match("^Section:") then
      el.classes:insert("exam-section")
    end
    return el
  end
  
  -- Question headers (## = level 2)
  if el.level == 2 then
    local text = pandoc.utils.stringify(el.content)
    
    -- Extract points: [N pts]
    local points = text:match("%[(%d+)%s*pts?%]")
    if points then
      el.attributes["data-points"] = points
      el.classes:insert("exam-question")
    end
    
    -- Detect T/F answer in header: → True or → False
    local tf_answer = text:match("→%s*(%w+)$")
    if tf_answer then
      el.attributes["data-answer"] = tf_answer:lower()
      el.classes:insert("tf-question")
    end
    
    return el
  end
  
  return el
end

-- Process solution divs (hide when solutions=false)
-- Note: .callout-tip is handled by Quarto natively
function Div(el)
  if el.classes:includes("solution") then
    local show_solutions = exam_options.solutions == "true"
    
    if show_solutions then
      -- Let it render normally
      el.classes:insert("solution-visible")
      return el
    else
      -- Hide solutions
      return {}
    end
  end
  
  -- Handle callout-tip: hide when solutions=false 
  if el.classes:includes("callout-tip") then
    local show_solutions = exam_options.solutions == "true"
    if not show_solutions then
      return {}
    end
  end
  
  return el
end

-- Remove vspace when solutions are shown
function RawBlock(el)
  if exam_options.solutions == "true" then
    -- Remove vspace commands when showing solutions
    if el.format == "latex" and el.text:match("\\vspace") then
      return {}
    end
  end
  return el
end

-- Process bullet lists (answer choices)
function BulletList(el)
  local has_correct = false
  
  for i, item in ipairs(el.content) do
    local text = pandoc.utils.stringify(item)
    
    -- Check for correct answer markers: ** or ✓
    if text:match("%*%*.*%*%*") or text:match("✓") then
      has_correct = true
      
      -- If solutions disabled, strip the markers
      if exam_options.solutions ~= "true" then
        -- Walk through and remove Strong elements
        item = pandoc.walk_block(pandoc.Div(item), {
          Strong = function(s)
            return s.content
          end,
          Str = function(s)
            if s.text == "✓" then
              return {}
            end
            return s
          end
        })
        el.content[i] = item.content
      end
    end
  end
  
  if has_correct then
    el.classes = el.classes or {}
    el.classes:insert("answer-choices")
  end
  
  return el
end

-- Return filter functions in correct order
return {
  {Meta = Meta},
  {Header = Header},
  {Div = Div},
  {BulletList = BulletList}
}
