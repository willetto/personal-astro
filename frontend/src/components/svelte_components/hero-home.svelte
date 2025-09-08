<script>
	import texture from '@images/textures/cardboard.jpg';
</script>

<div class="hero-wrapper" style={`--texture-url: url(${texture.src})`}>
	<h1 class="h0 hero-title" title="Hi, I'm Trey.">Hi, I'm Trey.</h1>
	<div class="subtitles">
		<p class="h1">I care about <span class="highlight">crafting thoughtfully.</span></p>
		<p class="h1">I work as a <span class="highlight">web developer.</span></p>
		<p class="h1">I aim to <span class="highlight">empower others.</span></p>
	</div>
</div>

<style>
	.hero-wrapper {
		--local-bg-color: oklch(96.41% 0 102.07);
		--local-font-color: oklch(55% 0.14 172);
		--local-highlight-gradient: conic-gradient(
			from 0deg at 54% -22% in oklch,
			oklch(90.07% 0.21 98.27) 20%,
			oklch(90.07% 0.21 98.27 / 0.5) 42%,
			oklch(90.07% 0.21 98.27) 72%
		);

		--local-highlight-blend: multiply;
		--local-texture-opacity: 0.2;

		position: relative;

		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		align-items: start;
		justify-content: center;

		font-family: var(--font-display);
		line-height: 0.9;
		text-transform: uppercase;

		/* min-height: 90vh; */
		padding: 5rem 1.5rem 5rem 1.5rem;

		/* text-align: center; */

		background-color: var(--local-bg-color);

		transition: background-color 0.3s ease-in-out;
		&::before {
			pointer-events: none;
			content: '';

			position: absolute;
			z-index: 0;
			left: 0;

			width: 100%;
			height: 100%;

			opacity: var(--local-texture-opacity);
			background-image: var(--texture-url);
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			mix-blend-mode: multiply;
		}
	}
	.hero-title {
		position: relative;
		backface-visibility: hidden;
		background-image: linear-gradient(120deg, oklch(66.98% 0.2236 43.225) 40%, oklch(90.07% 0.21 98.27) 60%);
		background-attachment: fixed;
		background-clip: text;

		-webkit-text-fill-color: transparent;
		&::before {
			pointer-events: none;
			content: attr(title);

			position: absolute;
			inset: 0;

			text-shadow:
				-3px 2px 6px #fff,
				0 0 0 oklch(17.76% 0 0);

			opacity: 0.4;
			background-color: oklch(17.76% 0 0);
			background-clip: text;
			mix-blend-mode: multiply;
		}
	}

	/* Override for Firefox: disable fixed attachment to avoid clipping issues */
	@supports (-moz-appearance: none) {
		.hero-title {
			background-attachment: scroll;
		}
	}
	.h0 {
	/* font-size: 8rem; */
	font-size: clamp(5rem, 2.4167rem + 7.2381vi, 8.75rem);
}

.h1 {
	width: 100%;
	color: var(--local-font-color);
	transition: color 0.3s ease-in-out;
	font-size: clamp(2.5rem, 1.3333rem + 3.0476vi, 5rem);
	}
	.subtitles * + * {
		/* z-index: 1; */
		margin-block-start: 1rem;
	}
	.highlight {
		position: relative;
		color: var(--local-font-color);
		white-space: nowrap;
		transition: color 0.3s ease-in-out;
		&::after {
			pointer-events: none;
			content: '';

			position: absolute;
			z-index: 2;
			top: 37%;
			left: -0.25rem;

			width: 0%;
			height: 60%;

			opacity: 0.5;
			background-image: var(--noise-1);
			mix-blend-mode: overlay;

			animation: highlightAnimation 0.5s ease-in-out forwards 0.3s;
			animation-delay: 1s;
		}

		&::before {
			pointer-events: none;
			content: '';

			position: absolute;
			top: 37%;
			left: -0.25rem;
			transform-origin: left;

			width: 0%;
			height: 60%;

			background-image: var(--local-highlight-gradient);
			background-size: cover;
			background-blend-mode: screen;
			mix-blend-mode: var(--local-highlight-blend);

			animation: highlightAnimation 0.5s ease-in-out forwards 0.3s;
			animation-delay: 1s;
		}
	}

	@media (prefers-color-scheme: dark) {
		.hero-wrapper {
			--local-bg-color: var(--color-base-900);
			--local-font-color: oklch(96.41% 0 102.07);
			--local-highlight-gradient: conic-gradient(
				from 0deg at 54% -22% in oklch,
				oklch(37% 0.206 261.5 / 0.8) 20%,
				oklch(37% 0.206 261.5) 42%,
				oklch(37% 0.206 261.5 / 0.8) 72%
			);
			--local-highlight-blend: screen;
			--local-texture-opacity: 0.4;
			/* mix-blend-mode: ; */
		}
	}

	@keyframes highlightAnimation {
		from {
			width: 0;
		}
		to {
			width: 99%;
		}
	}
</style>



