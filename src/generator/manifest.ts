/**
 * IMS Manifest Generator for Canvas QTI Packages
 * Creates the imsmanifest.xml required for Canvas import
 */

import { createHash } from 'crypto';

/**
 * Generate a manifest identifier
 */
function generateManifestId(title: string): string {
  return createHash('sha256').update(`manifest_${title}_${Date.now()}`).digest('hex').substring(0, 32);
}

/**
 * Generate imsmanifest.xml content for a QTI package
 */
export function generateManifest(
  assessmentTitle: string, 
  qtiFilename: string,
  assessmentIdent: string
): string {
  const manifestId = generateManifestId(assessmentTitle);
  const resourceId = generateManifestId(`resource_${assessmentTitle}`);
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${manifestId}" 
  xmlns="http://www.imsglobal.org/xsd/imsccv1p1/imscp_v1p1"
  xmlns:lom="http://ltsc.ieee.org/xsd/imsccv1p1/LOM/resource"
  xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_v1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsccv1p1/imscp_v1p1 http://www.imsglobal.org/xsd/imscp_v1p1.xsd http://ltsc.ieee.org/xsd/imsccv1p1/LOM/resource http://www.imsglobal.org/profile/cc/ccv1p1/LOM/ccv1p1_lomresource_v1p0.xsd http://www.imsglobal.org/xsd/imsmd_v1p2 http://www.imsglobal.org/xsd/imsmd_v1p2p2.xsd">
  <metadata>
    <schema>IMS Content</schema>
    <schemaversion>1.1.3</schemaversion>
    <imsmd:lom>
      <imsmd:general>
        <imsmd:title>
          <imsmd:string>${escapeXml(assessmentTitle)}</imsmd:string>
        </imsmd:title>
      </imsmd:general>
    </imsmd:lom>
  </metadata>
  <organizations/>
  <resources>
    <resource identifier="${resourceId}" type="imsqti_xmlv1p2">
      <file href="${qtiFilename}"/>
      <dependency identifierref="${assessmentIdent}"/>
    </resource>
  </resources>
</manifest>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
