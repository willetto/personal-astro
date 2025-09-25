# 🚀 Usage Guide for InfolkSlider

## Quick Integration Steps

### 1. Copy to Your Project
```bash
# Copy the entire InfolkSlider directory to your project
cp -r InfolkSlider/ /path/to/your/project/src/components/
```

### 2. Update Import Paths
In `InfolkSlider.svelte`, update the asset imports based on your bundler:

#### For Vite/SvelteKit:
```javascript
import HeroDot from './hero-slider-dot.svg';
import UnsplashImage from './unsplash.jpg';
```

#### For Webpack/Rollup:
```javascript
import HeroDot from './hero-slider-dot.svg';
import UnsplashImage from './unsplash.jpg';
```

#### For Static Assets (if bundler doesn't handle imports):
```javascript
const HeroDot = '/hero-slider-dot.svg';
const UnsplashImage = '/unsplash.jpg';
```

### 3. Use in Your Component
```svelte
<script>
  import InfolkSlider from './components/InfolkSlider/InfolkSlider.svelte';
</script>

<main>
  <section class="hero">
    <InfolkSlider dark_bg_styles={false} />
  </section>
</main>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
```

## 🔧 Bundler-Specific Notes

### SvelteKit
- Place assets in `static/` folder and use absolute paths: `/hero-slider-dot.svg`
- Or use `$lib` alias: `import HeroDot from '$lib/hero-slider-dot.svg'`

### Vite
- Should work with relative imports out of the box
- Make sure to add `?url` suffix for explicit URL imports if needed

### Webpack
- Configure file-loader or url-loader for SVG and image files
- May need to adjust webpack config for proper asset handling

## 🎨 Customization Tips

### Change Colors
Search and replace color values in the SVG paths:
- `#EFB900` → Your primary color
- `#DE5428` → Your secondary color  
- `#386D9F` → Your tertiary color

### Adjust Animations
Modify the scroll divisors for different animation speeds:
```svelte
<!-- Slower -->
style:transform={`translateY(${(scroll / 10) * -1}px)`}

<!-- Faster -->
style:transform={`translateY(${(scroll / 3) * -1}px)`}
```

### Custom Image
Pass an image URL as a prop:
```svelte
<script>
  export let imageUrl = './unsplash.jpg';
</script>

<div class="image">
  <img src={imageUrl} alt="Hero image" />
</div>
```

## 🚨 Common Issues

1. **Asset not found**: Check your bundler configuration for handling SVG/image imports
2. **Styles not applying**: Make sure SCSS is configured in your build process
3. **Responsive issues**: Verify breakpoint mixin is working with your CSS setup

## 📦 Alternative: Self-Contained Version

For a completely self-contained version that doesn't rely on bundler asset handling, convert the SVG to inline data and base64 encode the image. This makes the component truly portable but increases file size.

---

*This component was extracted from the Infolk website and prepared as a standalone portfolio piece.*
