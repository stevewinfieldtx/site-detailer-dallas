# Dallas Detail Co. — Photo Prompt Pack (fancy cars, "shot in our detail bay")

Photoreal prompts for the site's hero before/after + gallery. Tuned for Nano Banana 2 but work in
Midjourney, DALL·E/ChatGPT, Freepik, Ideogram, etc.

## Where each image goes (filename → site slot)
| Save as | Used for | Aspect |
|---|---|---|
| `assets/after.jpg` | Before/after slider — AFTER (glossy) | 4:5 (1024×1280) |
| `assets/before.jpg` | Before/after slider — BEFORE (dull, SAME car/angle) | 4:5 (1024×1280) |
| `assets/work-1.jpg` | Gallery — black exotic | 1:1 (1024×1024) |
| `assets/work-2.jpg` | Gallery — luxury interior | 1:1 |
| `assets/work-3.jpg` | Gallery — paint correction in progress | 1:1 |
| `assets/work-4.jpg` | Gallery — white SUV, ceramic/PPF | 1:1 |
| `assets/og.jpg` | Social share preview | 1.91:1 (1200×630) |

> Tip for the slider: generate AFTER first, then prompt BEFORE as "the SAME car, same angle, same
> framing, but dull and neglected" so the two line up when you drag. Once you drop a real `before.jpg`
> in, tell me and I'll remove the CSS dull-filter so it uses your real before shot.

---

## Shared style DNA (the look)
A premium, climate-controlled detailing studio: polished epoxy floor, matte charcoal walls, long
overhead LED light bars, subtle blue rim accents — the cinematic "showroom bay" aesthetic. Real
optical physics, deep wet clearcoat reflections, no CGI sheen.

---

### 1) AFTER — hero slider (save as `assets/after.jpg`, 4:5)
```
{
  "prompt": "Professional automotive photograph of a freshly ceramic-coated jet-black 2023 Porsche 911 parked at a three-quarter front angle inside a high-end detailing studio. Shot on a 35mm lens, f/4, ISO 200, camera at headlight height. The paint is flawless and mirror-wet: long overhead LED light bars stretch and reflect cleanly across the hood and door, deep liquid clearcoat with crisp reflections, tiny water beads pearling on the hood from a final rinse. Polished dark epoxy floor mirrors the car faintly; matte charcoal studio walls with a soft blue LED rim glow in the background, slightly out of focus. Crisp factory body lines, glossy black wheels, red brake calipers. Cinematic but realistic studio lighting, true-to-life color, subtle reflection of the photographer-free environment. Do not add logos or text. Photorealistic, ultra sharp on the car, shallow depth of field on the background.",
  "negative_prompt": "cartoon, illustration, 3d render, CGI, video game, plastic look, oversaturated, HDR halos, warped reflections, melted body panels, extra wheels, distorted logos, watermark, text, people, fisheye distortion, blurry car, dirty paint",
  "api_parameters": { "resolution": "2K", "output_format": "jpg", "aspect_ratio": "4:5" }
}
```

### 2) BEFORE — hero slider (save as `assets/before.jpg`, 4:5)
```
{
  "prompt": "Professional automotive photograph of the SAME jet-black 2023 Porsche 911 at the exact same three-quarter front angle and framing inside the same detailing studio, BUT before detailing: the paint is dull and oxidized with a hazy matte finish, visible swirl marks and fine scratches catching the overhead light, a layer of dust and dried water spots, faint dirt streaks down the doors, dull cloudy headlights. Same 35mm lens, f/4, ISO 200, same composition so it overlays the 'after' shot. Flat lifeless reflections instead of mirror gloss. Realistic, documentary condition shot. No text or logos.",
  "negative_prompt": "glossy, shiny, mirror finish, wet look, ceramic coated, cartoon, CGI, 3d render, plastic, different car, different angle, watermark, text, people",
  "api_parameters": { "resolution": "2K", "output_format": "jpg", "aspect_ratio": "4:5" }
}
```

### 3) Gallery — black exotic (save as `assets/work-1.jpg`, 1:1)
```
{
  "prompt": "Photorealistic rear three-quarter shot of a glossy matte-to-gloss ceramic-coated black Lamborghini Huracan inside a premium detailing studio, 35mm lens, f/2.8, ISO 200. Overhead LED light strips streak across the rear haunches and engine cover glass; deep wet reflections in the clearcoat, polished epoxy floor reflecting the taillights, charcoal walls with cool blue rim lighting softly blurred behind. Aggressive supercar lines, carbon accents, dark wheels. Cinematic showroom realism, true color, ultra sharp paint detail. No text, no logos, no people.",
  "negative_prompt": "cartoon, CGI, 3d render, plastic, oversaturated, warped panels, extra parts, watermark, text, people, fisheye",
  "api_parameters": { "resolution": "2K", "output_format": "jpg", "aspect_ratio": "1:1" }
}
```

### 4) Gallery — luxury interior (save as `assets/work-2.jpg`, 1:1)
```
{
  "prompt": "Photorealistic interior detail shot of a luxury car cabin (Mercedes-Benz S-Class, quilted tan nappa leather and piano-black trim), freshly detailed and conditioned. 35mm lens, f/2.0, ISO 320, natural studio light from a large softbox through the window. Leather looks clean, supple and lightly sheened from conditioner; stitching crisp; dashboard dust-free with a faint matte finish; steering wheel and infotainment screen spotless; a faint wisp of steam near the seat from steam cleaning. Shallow depth of field, warm true-to-life tones, premium and inviting. No text, no people, no hands.",
  "negative_prompt": "cartoon, CGI, plastic, oversaturated, dirty, stains, clutter, warped dashboard, watermark, text, people, hands",
  "api_parameters": { "resolution": "2K", "output_format": "jpg", "aspect_ratio": "1:1" }
}
```

### 5) Gallery — paint correction in progress (save as `assets/work-3.jpg`, 1:1)
```
{
  "prompt": "Photorealistic close action shot of paint correction in progress on a candy-red Ferrari fender inside a detailing studio. A dual-action polisher with a white foam pad rests against the glossy red panel, a single bright correction light (swirl-finder lamp) raking across the paint to reveal fine swirl marks being removed, half the panel mirror-glossy and half still hazy. 50mm lens, f/2.8, ISO 200, dramatic side lighting, dark background. Realistic reflections, micro paint detail, professional and high-end. No faces, no text, no logos.",
  "negative_prompt": "cartoon, CGI, 3d render, plastic, oversaturated, warped reflections, watermark, text, faces, full person",
  "api_parameters": { "resolution": "2K", "output_format": "jpg", "aspect_ratio": "1:1" }
}
```

### 6) Gallery — white SUV ceramic/PPF (save as `assets/work-4.jpg`, 1:1)
```
{
  "prompt": "Photorealistic front three-quarter shot of a pearl-white Range Rover with fresh ceramic coating and paint protection film inside a premium detailing studio, 35mm lens, f/3.5, ISO 200. Crisp water beads scattered across the glossy hood and roof catching overhead LED light, deep clean reflections, polished floor, charcoal walls with blue accent lighting softly blurred. Spotless glossy black grille and wheels, immaculate glass. Cinematic, realistic, ultra sharp. No text, no logos, no people.",
  "negative_prompt": "cartoon, CGI, 3d render, plastic, oversaturated, warped panels, dirt, watermark, text, people, fisheye",
  "api_parameters": { "resolution": "2K", "output_format": "jpg", "aspect_ratio": "1:1" }
}
```

### 7) BONUS — social share image (save as `assets/og.jpg`, 1.91:1 / 1200×630)
```
{
  "prompt": "Wide cinematic automotive photograph: a glossy ceramic-coated black luxury sports car at a three-quarter front angle inside a premium detailing studio, overhead LED light bars reflecting in the wet clearcoat, polished floor, charcoal walls with subtle blue rim light. Lots of clean negative space on the left for a logo/headline overlay. 35mm lens, f/4, ISO 200, true color, photorealistic, ultra sharp on the car, soft blurred background. No text, no logos, no people.",
  "negative_prompt": "cartoon, CGI, plastic, oversaturated, warped, watermark, text, people",
  "api_parameters": { "resolution": "2K", "output_format": "jpg", "aspect_ratio": "16:9" }
}
```

---

## After you have the images
1. Drop the files into `dallas-detail-co/assets/` with the filenames above.
2. Tell me — I'll repoint `index.html` from the Unsplash URLs to your local images and (if you made a
   real `before.jpg`) remove the CSS dull-filter so the slider uses your true before/after pair.
3. For per-metro reuse, regenerate with the city's signature cars or just reuse these (a detail bay
   looks the same in any city).
