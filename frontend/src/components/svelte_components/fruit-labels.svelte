<script lang="ts">
	import paper from '@images/textures/paper2.jpg';

	type ImageSource = string | { src: string };
	export let svg: ImageSource;
	export let color = '#95bf47';
	export let shape: 'oval' | 'round' | 'square' | 'oblong' = 'oval';
	export let angle: number = 0;
	export let title: string = 'skill';

	// Define different sticker shapes
	const shapes = {
		oval: '48% / 55px',
		round: '50%',
		square: '10px',
		oblong: '50px / 48%'
	} as const;

	// Define different padding values for each shape
	const paddings = {
		oval: '1.75rem 1rem',
		round: '1.75rem',
		square: '1.25rem 1rem',
		oblong: '1.1rem 2rem'
	} as const;

	$: stickerShape = shapes[shape];
	$: stickerPadding = paddings[shape];
	$: svgUrl = typeof svg === 'string' ? svg : (svg && 'src' in svg ? svg.src : '');
	const paperUrl: string = typeof paper === 'string' ? paper : (paper as { src: string }).src;
</script>

<div
	class="skill"
	style="--sticker-shape: {stickerShape}; --border-color: {color}; --rotation: {angle}deg; --sticker-padding: {stickerPadding}"
>
	<img src={svgUrl} alt={title} title={title} class="skill-icon" />
	<img src={paperUrl} alt="" class="skill-texture" aria-hidden="true" />
</div>

<style>
	.skill {
		position: relative;
		transform: rotate(var(--rotation, 0deg)) scale(1.05);

		overflow: hidden;

		height: fit-content;
		margin: -5px -3px;
		padding: var(--sticker-padding);
		border-radius: 1rem;
		border-radius: var(--sticker-shape);

		background-color: var(--color-tw-white)
		;
		box-shadow: 5px 5px 10px -5px rgba(0, 0, 0, 0.5);

		transition: transform 0.25s ease-in-out;
	}

	.skill:hover,
	.skill:focus-visible {
		transform: rotate(var(--rotation, 0deg)) scale(1.2);
		/* z-index: 10; */
	}

	.skill:after {
		content: '';

		position: absolute;
		inset: 3px;

		border: 3px solid var(--border-color);
		border-radius: var(--sticker-shape);
	}

	.skill-texture {
		pointer-events: none;

		position: absolute;
		z-index: 1;
		inset: 0;

		width: 100%;
		height: 100%;
		border-radius: var(--sticker-shape);

		opacity: 0.35;
		object-fit: cover;
		filter: grayscale(50%) brightness(0.75);
		mix-blend-mode: hard-light;
	}

	.skill-icon {
		pointer-events: none;

		position: relative;
		z-index: 2;

		width: 60px;
		height: 60px;

		object-fit: contain;
	}
</style>


