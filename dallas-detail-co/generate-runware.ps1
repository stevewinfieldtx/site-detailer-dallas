# Generate Dallas Detail Co. photos via Runware API (FLUX.1-dev) and download to assets/.
# Key is read from ..\.env  (RUNWARE_API_KEY="..."), so it never appears in the command.
$ErrorActionPreference = "Stop"

$root   = Split-Path -Parent $PSScriptRoot   # project root (one up from dallas-detail-co)
$envPath = Join-Path $root ".env"
$assets = Join-Path $PSScriptRoot "assets"
New-Item -ItemType Directory -Force -Path $assets | Out-Null

$envLine = Get-Content $envPath | Where-Object { $_ -match "RUNWARE_API_KEY" } | Select-Object -First 1
if (-not $envLine) { Write-Output "ERROR: RUNWARE_API_KEY not found in $envPath"; exit 1 }
$key = ($envLine -split "=",2)[1].Trim().Trim('"')

$model = "runware:100@1"   # FLUX.1 [dev] — photoreal
$studio = "inside a high-end climate-controlled detailing studio: polished dark epoxy floor with faint reflections, matte charcoal walls, long overhead LED light bars, subtle blue LED rim accents softly out of focus in the background"

$jobs = @(
  @{ file="after.jpg";  w=1024; h=1280; p="Professional automotive photograph of a freshly ceramic-coated jet-black 2023 Porsche 911 at a three-quarter front angle $studio. Shot on a 35mm lens, f/4, ISO 200, camera at headlight height. Mirror-wet flawless paint, long overhead LED light bars reflecting cleanly across the hood and door, deep liquid clearcoat, tiny water beads pearling on the hood from a final rinse, glossy black wheels, red brake calipers. Cinematic realistic studio lighting, true-to-life color, ultra sharp on the car, shallow depth of field. No text, no logos, no people." }
  @{ file="before.jpg"; w=1024; h=1280; p="Documentary automotive photograph of a jet-black 2023 Porsche 911 at a three-quarter front angle $studio, before detailing: dull oxidized hazy paint with a flat matte finish, visible swirl marks and fine scratches catching the overhead light, a layer of dust and dried water spots, faint dirt streaks down the doors, dull cloudy headlights, lifeless reflections. 35mm lens, f/4, ISO 200, realistic neglected condition. No text, no logos, no people." }
  @{ file="work-1.jpg"; w=1024; h=1024; p="Photorealistic rear three-quarter shot of a glossy ceramic-coated black Lamborghini Huracan $studio. 35mm lens, f/2.8, ISO 200. Overhead LED light strips streak across the rear haunches and engine cover glass, deep wet reflections in the clearcoat, polished floor reflecting the taillights, carbon accents, dark wheels. Cinematic showroom realism, true color, ultra sharp paint detail. No text, no logos, no people." }
  @{ file="work-2.jpg"; w=1024; h=1024; p="Photorealistic interior detail shot of a luxury Mercedes-Benz S-Class cabin with quilted tan nappa leather and piano-black trim, freshly detailed and conditioned. 35mm lens, f/2.0, ISO 320, soft natural studio light. Supple lightly-sheened leather, crisp stitching, dust-free dashboard, spotless steering wheel and infotainment screen, a faint wisp of steam near the seat. Shallow depth of field, warm true-to-life tones, premium and inviting. No text, no people, no hands." }
  @{ file="work-3.jpg"; w=1024; h=1024; p="Photorealistic close action shot of paint correction in progress on a candy-red Ferrari fender $studio. A dual-action polisher with a white foam pad against the glossy red panel, a single bright swirl-finder lamp raking across the paint, half the panel mirror-glossy and half still hazy with swirl marks. 50mm lens, f/2.8, ISO 200, dramatic side lighting, dark background, micro paint detail. No faces, no text, no logos." }
  @{ file="work-4.jpg"; w=1024; h=1024; p="Photorealistic front three-quarter shot of a pearl-white Range Rover with fresh ceramic coating and paint protection film $studio. 35mm lens, f/3.5, ISO 200. Crisp water beads scattered across the glossy hood and roof catching overhead LED light, deep clean reflections, glossy black grille and wheels, immaculate glass. Cinematic, realistic, ultra sharp. No text, no logos, no people." }
  @{ file="og.jpg";     w=1216; h=640;  p="Wide cinematic automotive photograph: a glossy ceramic-coated black luxury sports car at a three-quarter front angle $studio, overhead LED light bars reflecting in the wet clearcoat. Generous clean negative space on the left side of the frame. 35mm lens, f/4, ISO 200, true color, photorealistic, ultra sharp on the car, soft blurred background. No text, no logos, no people." }
)

foreach ($j in $jobs) {
  $uuid = [guid]::NewGuid().ToString()
  $task = @(@{
    taskType      = "imageInference"
    taskUUID      = $uuid
    positivePrompt= $j.p
    model         = $model
    width         = $j.w
    height        = $j.h
    steps         = 28
    CFGScale      = 3.5
    numberResults = 1
    outputType    = "URL"
    outputFormat  = "JPG"
  })
  $body = ConvertTo-Json $task -Depth 8
  Write-Output "Generating $($j.file) ($($j.w)x$($j.h))..."
  try {
    $resp = Invoke-RestMethod -Method Post -Uri "https://api.runware.ai/v1" `
      -Headers @{ Authorization = "Bearer $key" } -ContentType "application/json" -Body $body
    $url = $resp.data[0].imageURL
    if ($url) {
      $out = Join-Path $assets $j.file
      Invoke-WebRequest -Uri $url -OutFile $out
      Write-Output "  saved -> assets/$($j.file)"
    } else {
      Write-Output "  no imageURL returned: $($resp | ConvertTo-Json -Depth 6)"
    }
  } catch {
    Write-Output "  ERROR on $($j.file): $($_.Exception.Message)"
    if ($_.ErrorDetails.Message) { Write-Output "  $($_.ErrorDetails.Message)" }
  }
}
Write-Output "Done."
