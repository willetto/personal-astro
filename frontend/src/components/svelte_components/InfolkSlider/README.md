# 🎨 InfolkSlider Component

A beautiful, interactive SVG slider component extracted from the Infolk website. This component features scroll-based animations, responsive design, and a modern aesthetic perfect for hero sections and visual displays.

## ✨ Features

- **Responsive Design**: Separate optimized layouts for desktop and mobile
- **Scroll Animations**: Floating dots that move based on scroll position
- **Theme Support**: Light and dark theme variations
- **Self-Contained**: All assets and styles included
- **Zero Dependencies**: Pure Svelte component with no external dependencies
- **Customizable**: Easy to modify colors, animations, and layout

## 🚀 Quick Start

### Installation

1. Copy the `InfolkSlider` directory to your project
2. Import the component in your Svelte application:

```svelte
<script>
  import InfolkSlider from './path/to/InfolkSlider/InfolkSlider.svelte';
</script>

<InfolkSlider dark_bg_styles={false} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dark_bg_styles` | `boolean` | `false` | Enable dark theme styling |

## 🎨 Customization

### Colors

The component uses the following color palette:
- **Yellow**: `#EFB900` (Primary accent)
- **Red**: `#DE5428` (Secondary accent)  
- **Blue**: `#386D9F` (Tertiary accent)
- **Navy**: `#132E53` (Dark theme base)

### Breakpoints

- **Phone**: `max-width: 450px`
- **Tablet**: `max-width: 850px`
- **Desktop**: `851px - 1599px`
- **Wide**: `min-width: 1600px`

### Animation Customization

Scroll-based animations can be adjusted by modifying the divisors in the transform calculations:

```svelte
<!-- Slower animation -->
style:transform={`translateY(${(scroll / 10) * -1}px)`}

<!-- Faster animation -->
style:transform={`translateY(${(scroll / 3) * -1}px)`}
```

## 📁 File Structure

```
InfolkSlider/
├── InfolkSlider.svelte    # Main component
├── assets/
│   ├── hero-slider-dot.svg # Animated dot asset
│   └── unsplash.jpg       # Default hero image
├── demo.html              # Interactive demo
└── README.md              # This file
```

## 🎯 Usage Examples

### Basic Usage
```svelte
<InfolkSlider />
```

### Dark Theme
```svelte
<InfolkSlider dark_bg_styles={true} />
```

### Custom Container
```svelte
<div class="hero-section">
  <InfolkSlider dark_bg_styles={false} />
</div>

<style>
  .hero-section {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
</style>
```

## 🔧 Development

### Testing

Open `demo.html` in your browser to see the component in action and test different configurations.

### Customizing the Image

Replace `assets/unsplash.jpg` with your own image, or modify the component to accept an image prop:

```svelte
<script>
  export let imageUrl = './assets/unsplash.jpg';
</script>

<div class="image">
  <img src={imageUrl} alt="Hero image" />
</div>
```

## 📱 Responsive Behavior

- **Desktop**: Full SVG with complex geometric shapes and three animated dots
- **Mobile**: Simplified SVG layout with repositioned image and hidden dots for performance
- **Image**: Circular cropped image that repositions based on screen size

## 🎭 Animation Details

The component features three types of animations:

1. **Scroll-based dot movement**: Dots move at different rates as user scrolls
2. **SVG opacity**: Elements have varying opacity for depth effect
3. **Responsive transitions**: Smooth transitions between breakpoints

## 🤝 Contributing

This component was extracted from the Infolk website as a portfolio piece. Feel free to adapt and modify for your own projects!

## 📄 License

This component is provided as-is for portfolio and educational purposes.

---

*Created as a showcase piece demonstrating advanced Svelte component architecture and responsive design.*
