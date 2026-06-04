# Regenerate Dallas Detail Co. photos via Runware -> Nano Banana Pro (google:4@2).
# Base shots are text-to-image; the BEFORE is created by editing the new after.jpg (reference image)
# so the before/after pair matches exactly. Key read from ..\.env.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$assets = Join-Path $PSScriptRoot "assets"
New-Item -ItemType Directory -Force -Path $assets | Out-Null
$envLine = Get-Content (Join-Path $root ".env") | Where-Object { $_ -match "RUNWARE_API_KEY" } | Select-Object -First 1
$key = ($envLine -split "=",2)[1].Trim().Trim('"')
$model = "google:4@2"
$studio = "inside a high-end climate-controlled detailing studio: polished dark epoxy floor with faint reflections, matte charcoal walls, long overhead LED light bars, subtle blue LED rim accents softly out of focus in the background"

function Generate($file,$w,$h,$prompt,$refB64) {
  $t = @{
    taskType      = "imageInference"
    taskUUID      = [guid]::NewGuid().ToString()
    positivePrompt= $prompt
    model         = $model
    width         = $w
    height        = $h
    numberResults = 1
    outputType    = "URL"
    outputFormat  = "JPG"
  }
  if ($refB64) { $t["referenceImages"] = @($refB64) }
  $body = ConvertTo-Json @($t) -Depth 8
  Write-Output "Generating $file ($w x $h)$(if($refB64){' [edit]'})..."
  try {
    $resp = Invoke-RestMethod -Method Post -Uri "https://api.runware.ai/v1" `
      -Headers @{ Authorization = "Bearer $key" } -ContentType "application/json" -Body $body
    $url = $resp.data[0].imageURL
    if ($url) { Invoke-WebRequest -Uri $url -OutFile (Join-Path $assets $file); Write-Output "  saved -> assets/$file" }
    else { Write-Output ("  no url: " + ($resp | ConvertTo-Json -Depth 6)) }
  } catch {
    Write-Output "  ERROR ${file}: $($_.Exception.Message)"
    if ($_.ErrorDetails.Message) { Write-Output "  $($_.ErrorDetails.Message)" }
  }
}

# --- base (text-to-image) ---
Generate "after.jpg" 1024 1280 "Professional automotive photograph of a freshly ceramic-coated jet-black 2023 Porsche 911 at a three-quarter front angle $studio. 35mm lens, f/4, ISO 200, camera at headlight height. Mirror-wet flawless paint, overhead LED light bars reflecting cleanly across the hood and door, deep liquid clearcoat, tiny water beads pearling from a final rinse, glossy black wheels, red brake calipers. Cinematic realistic studio lighting, true-to-life color, ultra sharp, shallow depth of field. No text, no logos, no people." $null
Generate "work-1.jpg" 1024 1024 "Photorealistic rear three-quarter shot of a glossy ceramic-coated black Lamborghini Huracan $studio. 35mm lens, f/2.8, ISO 200. Overhead LED light strips streak across the rear haunches and engine cover glass, deep wet reflections, polished floor reflecting the taillights, carbon accents, dark wheels. Cinematic showroom realism, ultra sharp. No text, no logos, no people." $null
Generate "work-2.jpg" 1024 1024 "Photorealistic interior detail shot of a luxury Mercedes-Benz S-Class cabin with quilted tan nappa leather and piano-black trim, freshly detailed and conditioned. 35mm lens, f/2.0, ISO 320, soft natural studio light. Supple lightly-sheened leather, crisp stitching, dust-free dashboard, spotless screen, a faint wisp of steam near the seat. Shallow depth of field, warm true tones. No text, no people, no hands." $null
Generate "work-3.jpg" 1024 1024 "Photorealistic close action shot of paint correction on a candy-red Ferrari fender $studio. A dual-action polisher with a white foam pad against the glossy red panel, a bright swirl-finder lamp raking across the paint, half the panel mirror-glossy and half still hazy with swirl marks. 50mm lens, f/2.8, ISO 200, dramatic side lighting, dark background, micro paint detail. No faces, no text, no logos." $null
Generate "work-4.jpg" 1024 1024 "Photorealistic front three-quarter shot of a pearl-white Range Rover with fresh ceramic coating and paint protection film $studio. 35mm lens, f/3.5, ISO 200. Crisp water beads across the glossy hood and roof catching overhead LED light, deep clean reflections, glossy black grille and wheels, immaculate glass. Cinematic, ultra sharp. No text, no logos, no people." $null
Generate "og.jpg" 1216 640 "Wide cinematic automotive photograph: a glossy ceramic-coated black luxury sports car at a three-quarter front angle $studio, overhead LED light bars reflecting in the wet clearcoat. Generous clean negative space on the left side of the frame. 35mm lens, f/4, ISO 200, photorealistic, ultra sharp on the car, soft blurred background. No text, no logos, no people." $null

# --- before: edit the freshly made after so the pair matches ---
$afterPath = Join-Path $assets "after.jpg"
if (Test-Path $afterPath) {
  $b64 = "data:image/jpeg;base64," + [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($afterPath))
  Generate "before.jpg" 1024 1280 "Edit this exact photo. Keep the SAME black Porsche 911, identical camera angle, framing, studio and lighting, but show the car BEFORE detailing: dull heavily oxidized hazy matte paint, a thick film of dust and grime, dried white water spots and dirty streaks across the body and windows, visible heavy swirl marks and fine scratches catching the light, grimy dusty wheels, dull cloudy headlights, lifeless flat reflections. Neglected and dirty, realistic documentary photo. Do not change the car model, angle, or background." $b64
} else { Write-Output "after.jpg missing — skipped before edit" }
Write-Output "Done."
