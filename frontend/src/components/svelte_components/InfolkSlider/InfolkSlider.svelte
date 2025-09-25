<script lang="ts">
	export let dark_bg_styles: boolean = false;
	let scroll: number;
	let opacity = !dark_bg_styles ? 0.2 : 0.5;

	// Import the local assets from the public directory
	// In Astro, assets in the public directory are served from the root
	const HeroDot = '/svelte-assets/hero-slider-dot.svg';
	const UnsplashImage = '/svelte-assets/unsplash.jpg';
</script>

<svelte:window bind:scrollY={scroll} />
<div class="wrapper max-width">
	<svg fill="none" viewBox="0 0 1200 327" xmlns="http://www.w3.org/2000/svg" class="hide-phone">
		<path
			{opacity}
			d="M179 40.7283C179 18.787 161.315 1 139.5 1C117.685 1 100 18.787 100 40.7283V287.272C100 309.213 117.685 327 139.5 327C161.315 327 179 309.213 179 287.272V40.7283Z"
			fill="#EFB900"
		/>
		<path
			d="M764 326C764 305.844 756.046 286.513 741.887 272.26C727.728 258.007 708.524 250 688.5 250C668.476 250 649.272 258.007 635.113 272.26C620.954 286.513 613 305.844 613 326"
			fill="#DE5428"
		/>
		<path
			{opacity}
			d="M865.241 111C887.199 111 905 93.0914 905 71C905 48.9086 887.199 31 865.241 31L525.759 31C503.801 31 486 48.9086 486 71C486 93.0914 503.801 111 525.759 111L865.241 111Z"
			fill="#386D9F"
		/>
		<path
			{opacity}
			d="M1200 31C1160.75 31 1123.1 46.5401 1095.35 74.2017C1067.59 101.863 1052 139.381 1052 178.5C1052 217.619 1067.59 255.137 1095.35 282.798C1123.1 310.46 1160.75 326 1200 326"
			fill="#EFB900"
		/>
		<path
			d="M905 31C943.987 31 981.377 46.5401 1008.94 74.2017C1036.51 101.863 1052 139.381 1052 178.5C1052 217.619 1036.51 255.137 1008.94 282.798C981.377 310.46 943.987 326 905 326"
			fill="#EFB900"
		/>
		<path
			{opacity}
			d="M-7.62939e-06 287.15C-7.62939e-06 309.158 17.9086 327 40 327C62.0914 327 80 309.158 80 287.15L80 39.8502C80 17.8415 62.0914 0 40 0C17.9086 0 -7.62939e-06 17.8415 -7.62939e-06 39.8502L-7.62939e-06 287.15Z"
			fill="#386D9F"
		/>
		<path
			d="M905 31C943.987 31 981.377 46.5401 1008.94 74.2017C1036.51 101.863 1052 139.381 1052 178.5C1052 217.619 1036.51 255.137 1008.94 282.798C981.377 310.46 943.987 326 905 326"
			fill="#EFB900"
		/>
		<path
			{opacity}
			d="M689.5 111C808.517 111 905 207.26 905 326H797.519C797.521 311.884 794.736 297.906 789.322 284.864C783.908 271.822 775.972 259.972 765.966 249.99C755.961 240.007 744.082 232.088 731.008 226.685C717.934 221.282 703.921 218.501 689.77 218.5C675.618 218.501 661.605 221.282 648.531 226.685C635.457 232.088 623.578 240.006 613.572 249.989C603.567 259.971 595.63 271.822 590.216 284.864C584.802 297.906 582.017 311.884 582.019 326H474C474 207.26 570.482 111 689.5 111Z"
			fill="#DE5428"
		/>
	</svg>
	<svg fill="none" viewBox="0 0 396 443" xmlns="http://www.w3.org/2000/svg" class="show-phone">
		<path
			opacity="0.2"
			d="M134.653 37.891C134.653 22.6358 122.286 10.269 107.031 10.269C91.7758 10.269 79.409 22.6358 79.409 37.891V209.307C79.409 224.562 91.7758 236.929 107.031 236.929C122.286 236.929 134.653 224.562 134.653 209.307V37.891Z"
			fill="#EFB900"
		/>
		<g filter="url(#filter0_d_0_1)">
			<path
				d="M107.622 65.244C122.877 65.244 135.244 52.8772 135.244 37.622C135.244 22.3668 122.877 10 107.622 10C92.3668 10 80 22.3668 80 37.622C80 52.8772 92.3668 65.244 107.622 65.244Z"
				fill="white"
			/>
		</g>
		<path
			opacity="0.1"
			d="M337.994 367.333C353.249 367.333 365.616 354.966 365.616 339.711C365.616 324.456 353.249 312.089 337.994 312.089H243.016C227.761 312.089 215.394 324.456 215.394 339.711C215.394 354.966 227.761 367.333 243.016 367.333H337.994Z"
			fill="#386D9F"
		/>
		<path
			opacity="0.2"
			d="M215.397 237.014C188.159 237.014 162.037 247.834 142.777 267.094C123.517 286.354 112.697 312.476 112.697 339.714C112.697 366.952 123.517 393.074 142.777 412.334C162.037 431.594 188.159 442.414 215.397 442.414"
			fill="#EFB900"
		/>
		<g filter="url(#filter1_d_0_1)">
			<path
				d="M338.641 366.591C353.537 366.591 365.612 354.516 365.612 339.62C365.612 324.724 353.537 312.649 338.641 312.649C323.745 312.649 311.67 324.724 311.67 339.62C311.67 354.516 323.745 366.591 338.641 366.591Z"
				fill="white"
			/>
		</g>
		<path
			opacity="0.1"
			d="M10 209.038C10 224.293 22.3668 236.66 37.622 236.66C52.8772 236.66 65.244 224.293 65.244 209.038L65.244 37.622C65.244 22.3668 52.8772 10 37.622 10C22.3668 10 10 22.3668 10 37.622L10 209.038Z"
			fill="#386D9F"
		/>
		<g filter="url(#filter2_d_0_1)">
			<path
				d="M37.97 237.009C53.4174 237.009 65.94 224.486 65.94 209.039C65.94 193.592 53.4174 181.069 37.97 181.069C22.5226 181.069 10 193.592 10 209.039C10 224.486 22.5226 237.009 37.97 237.009Z"
				fill="white"
			/>
		</g>
		<path
			d="M10 237.014C37.2377 237.014 63.3599 247.834 82.6199 267.094C101.88 286.354 112.7 312.476 112.7 339.714C112.7 366.952 101.88 393.074 82.6199 412.334C63.3599 431.594 37.2377 442.414 10 442.414"
			fill="#EFB900"
		/>
		<path
			opacity="0.2"
			d="M338.378 296.253C353.633 296.253 366 283.886 366 268.631C366 253.376 353.633 241.009 338.378 241.009H243.4C228.145 241.009 215.778 253.376 215.778 268.631C215.778 283.886 228.145 296.253 243.4 296.253H338.378Z"
			fill="#DE5428"
		/>
		<g filter="url(#filter3_d_0_1)">
			<path
				d="M242.751 295.511C257.647 295.511 269.722 283.436 269.722 268.54C269.722 253.644 257.647 241.569 242.751 241.569C227.855 241.569 215.78 253.644 215.78 268.54C215.78 283.436 227.855 295.511 242.751 295.511Z"
				fill="white"
			/>
		</g>
		<path
			d="M316.387 442.409C316.387 438.936 315.703 435.497 314.374 432.288C313.045 429.08 311.097 426.164 308.641 423.709C306.185 421.253 303.27 419.305 300.061 417.976C296.852 416.647 293.413 415.963 289.94 415.963C286.467 415.963 283.028 416.647 279.82 417.976C276.611 419.305 273.696 421.253 271.24 423.709C268.784 426.164 266.836 429.08 265.507 432.288C264.178 435.497 263.494 438.936 263.494 442.409"
			fill="#DE5428"
		/>
		<path
			opacity="0.1"
			d="M289.951 366.728C310.021 366.73 329.267 374.705 343.457 388.897C357.647 403.09 365.618 422.338 365.616 442.408H327.878C327.878 437.439 326.9 432.519 324.999 427.929C323.098 423.338 320.312 419.167 316.799 415.653C313.286 412.139 309.115 409.352 304.525 407.45C299.935 405.548 295.015 404.569 290.046 404.568C280.012 404.57 270.389 408.557 263.294 415.653C256.2 422.75 252.215 432.374 252.216 442.408H214.289C214.287 422.339 222.257 403.091 236.446 388.898C250.636 374.706 269.882 366.731 289.951 366.728Z"
			fill="#DE5428"
		/>
		<defs>
			<filter
				id="filter0_d_0_1"
				x="70"
				y="0"
				width="95.244"
				height="95.244"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dx="10" dy="10" />
				<feGaussianBlur stdDeviation="10" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.102 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
			</filter>
			<filter
				id="filter1_d_0_1"
				x="301.67"
				y="302.649"
				width="93.942"
				height="93.942"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dx="10" dy="10" />
				<feGaussianBlur stdDeviation="10" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.102 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
			</filter>
			<filter
				id="filter2_d_0_1"
				x="0"
				y="171.069"
				width="95.94"
				height="95.94"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dx="10" dy="10" />
				<feGaussianBlur stdDeviation="10" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.102 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
			</filter>
			<filter
				id="filter3_d_0_1"
				x="205.78"
				y="231.569"
				width="93.942"
				height="93.942"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dx="10" dy="10" />
				<feGaussianBlur stdDeviation="10" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.102 0" />
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
			</filter>
		</defs>
	</svg>

	<!-- Image container with default image -->
	<div class="hero-image">
		<img src={UnsplashImage} alt="Hero image" />
	</div>
	
	<!-- Animated dots with scroll effects -->
	<div class="dot1 dot hide-phone" style:transform={`translateY(${(scroll / 6) * -1}px)`}>
		<img src={HeroDot} alt="" />
	</div>
	<div class="dot2 dot hide-phone" style:transform={`translateY(${scroll / 7}px)`}>
		<img src={HeroDot} alt="" />
	</div>
	<div class="dot3 dot hide-phone" style:transform={`translateX(${scroll / 5}px)`}>
		<img src={HeroDot} alt="" />
	</div>
</div>

<style>
	/* Utility classes */
	.max-width {
		position: relative;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.hide-phone {
		display: block;
	}

	@media only screen and (max-width: 450px) {
		.hide-phone {
			display: none !important;
		}
	}

	.show-phone {
		display: none !important;
	}

	@media only screen and (max-width: 450px) {
		.show-phone {
			display: inherit !important;
		}
	}

	/* Main component styles */
	.wrapper {
		position: relative;
	}
	
	.hero-image {
		position: absolute;
		bottom: 0%;
		left: 15.25%;
		width: 27%;
		overflow: hidden;
		border-radius: 100%;
	}
	
	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: 1/1;
	}
	
	@media only screen and (max-width: 450px) {
		.hero-image {
			top: 2%;
			right: 8%;
			bottom: unset;
			left: unset;
			width: 57%;
		}
	}
	
	.dot {
		position: absolute;
		width: 10%;
	}
	
	.dot img {
		width: 100%;
		height: auto;
	}
	
	.dot1 {
		top: 73%;
		left: -0.83%;
	}
	
	.dot2 {
		top: -3.5%;
		left: 7.45%;
	}
	
	.dot3 {
		top: 6.4%;
		right: 43.45%;
	}

	/* SVG styles */
	svg {
		width: 100%;
		height: auto;
	}
</style>
