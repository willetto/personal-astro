<script>
	import SkillItem from './fruit-labels.svelte';
	import astro from '@images/icons/astro.svg?url';
	import css from '@images/icons/css.svg?url';
	import d3 from '@images/icons/d3.svg?url';
	import patreon from '@images/icons/patreon.svg?url';
	import shopify from '@images/icons/shopify.svg?url';
	import storyblok from '@images/icons/storyblok.svg?url';
	import svelte from '@images/icons/svelte.svg?url';
	import ts from '@images/icons/ts.svg?url';
	import vue from '@images/icons/vue.svg?url';
	import wp from '@images/icons/wp.svg?url';
</script>

<div class="skills-wrapper">
	<div class="skills-header"></div>
	<div class="skills-list">
		<SkillItem svg={shopify} color="#95bf47" shape="oblong" angle={10} title="Shopify" />
		<SkillItem svg={svelte} color="#FC2506" shape="oval" angle={-15} title="Svelte" />
		<SkillItem svg={wp} color="#1C6189" shape="square" angle={5} title="WordPress" />
		<SkillItem svg={astro} color="#FF5D01" shape="oval" angle={-5} title="Astro" />
		<SkillItem svg={css} color="rebeccapurple" shape="round" title="CSS" />
		<SkillItem svg={d3} color="#F7931E" shape="square" angle={10} title="D3" />
		<SkillItem svg={patreon} color="#000" shape="oval" angle={10} title="Patreon" />
		<SkillItem svg={storyblok} color="#09B3AF" shape="square" angle={-10} title="Storyblok" />
		<SkillItem svg={ts} color="#3178C6" shape="square" angle={10} title="TypeScript" />
		<SkillItem svg={vue} color="#4FC08D" shape="oval" title="Vue" />
	</div>
</div>

<style>
	.skills-wrapper {
		display: grid;
		place-items: center;
		padding: 4rem 3rem;
	}
	.skills-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;

		width: 100%;
		/* max-width: 800px; */
	}
</style>


