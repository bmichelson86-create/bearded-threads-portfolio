# Bearded Threads

## Project Overview
Bearded Threads embodies the intersection of premium comfort and meticulous design. This interactive platform is crafted to deliver an immersive, robust user experience that mirrors the uncompromising quality of our apparel. The site presents a sensory-rich journey, translating tactile heavyweight fabrics and relaxed silhouettes into a digital environment characterized by graceful interactions, arresting visuals, and seamless navigation. Every interaction is designed with intention to establish a profound brand connection.

## Tech Stack
Our architecture intentionally bypasses bloated frameworks in favor of a lean, performant, and highly expressive foundation:
- **HTML5**: Providing a resilient, semantic, and highly accessible document structure.
- **CSS3**: Custom, deeply considered syntax emphasizing absolute aesthetic control, utilizing native CSS variables, Grid, and Flexbox for uncompromised layouts.
- **GSAP (GreenSock Animation Platform)**: Driving the kinetic experience, powering complex choreographies, scroll-triggered reveals, and fluid state transitions that distinguish the platform.

## Key Technical Features
- **Custom BTCC Logo Intro**: A deliberate, motion-driven sequence to introduce the signature BTCC monogram. Driven by GSAP, this captivating splash sequence sets a premium, highly polished tone the precise moment a user arrives.
- **Mobile-Responsive Layout**: A masterfully executed responsive architecture. The interface gracefully adapts across arbitrary viewports—from extensive desktop displays to mobile devices—ensuring absolute visual fidelity without sacrificing functionality.
- **Refined Filtering System**: Instantaneous, client-side product filtering categorized seamlessly across our essential lines. 

## Performance & Asset Optimization
To sustain 60fps animations alongside high-fidelity media, we employed rigorous optimization strategies throughout the production pipeline:
- **Next-Gen Image Formats**: Comprehensive utilization of `.webp` formatting (e.g., `./BTCChoodie.webp`, `./white-tshirt-product.webp`, `./black-snapback-product.webp`, and model assets like `./tan-beanie-model1.webp`). These assets reside securely in the standard root directory to minimize network requests while drastically reducing payload weights.
- **Compressed Video Assets**: Streamlined kinetic focal points utilizing highly compressed background video elements (including `./BTCCintrovideo.mp4` and `./BTCC_flash.mp4`). This ensures immediate background playback and consistent cinematic framerates.
