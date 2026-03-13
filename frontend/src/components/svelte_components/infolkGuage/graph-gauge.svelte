<script lang="ts">
  import * as d3 from "d3";
  import { fade, scale } from "svelte/transition";
  export let labels: [string, string];
  export let baseline: DataPoint;
  export let baselineStDev: number;
  export let compare: DataPoint;
  export let margin: [number, number, number, number] = [0, 0, 0, 0];

  let gaugeWrapper;

  let w = 0;

  // let circleHover = false;
  // let candidateHover = false;

  var chartScale = [
    { name: "1", size: 20 },
    { name: "2", size: 15 },
    { name: "3", size: 35 },
    { name: "4", size: 15 },
    { name: "5", size: 20 },
  ];
  const angleGen = d3
    .pie()
    .value((d) => d.size)
    .sortValues((a, b) => (a.name < b.name ? 1 : -1))
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2);

  const scaleData = angleGen(chartScale);

  const scaleColors = d3
    .scaleOrdinal()
    .domain(scaleData)
    .range(["#E5D3D2", "#E5DFCC", "#D2DAD9", "#E5DFCC", "#E5D3D2"]);

  $: arcGen = d3
    .arc()
    .innerRadius(0)
    .outerRadius(w / 2 - w * 0.13);

  let baselinePercent = (baseline[0] - baseline[1] + 1) / 2;
  let baselineRad =
    baselinePercent * 163 * (Math.PI / 180) - (Math.PI / 2 - 0.15);

  let comparePercent = (compare[0] - compare[1] + 1) / 2;
  let compareRad =
    comparePercent * 163 * (Math.PI / 180) - (Math.PI / 2 - 0.15);

  // let compareRad = compare * 163 * (Math.PI / 180) - (Math.PI / 2 - 0.15); // old calc
  $: compareCoords = d3.pointRadial(compareRad, w / 2 - w * 0.065);
</script>

<div class="graph-wrapper">
  <div
    class="gauge-wrapper {labels[0]}-gauge"
    bind:this={gaugeWrapper}
    bind:clientWidth={w}
  >
    {#if w !== 0}
      <svg viewBox={`0 0 ${w} ${w * 0.6}`}>
        <g transform="translate({w / 2},{w * 0.55})">
          <path
            class="blue-band"
            d={d3.arc()({
              innerRadius: w / 2 - w * 0.13,
              outerRadius: w / 2,
              startAngle: -Math.PI / 2,
              endAngle: Math.PI / 2,
            })}
            width={w}
            stroke="#fff"
            vector-effect="non-scaling-stroke"
            stroke-width="2"
            fill="#9BB5CF"
          />
          <g class="pie">
            {#each scaleData as slice, i}
              <path
                d={arcGen(slice)}
                fill={scaleColors(i)}
                stroke="#fff"
                stroke-width="2"
                vector-effect="non-scaling-stroke"
              />
            {/each}
            <circle r="5" cx="0" cy="-2" fill="#132e53" />
          </g>
          <path
            class="baseline"
            d={d3.arc()({
              innerRadius: w / 2 - w * 0.13 + 2,
              outerRadius: w / 2 - 2,
              startAngle: baselineRad - baselineStDev * 1,
              endAngle: baselineRad + baselineStDev * 1,
            })}
            width={w}
            stroke="#707070"
            stroke-width="2"
            fill="#e5e5e0"
            in:fade={{ duration: 200, delay: 100 }}
          />
          <line
            x1="0"
            x2="0"
            y1="0"
            y2={-w * 0.53}
            stroke="#132e5399"
            stroke-width="2"
            stroke-dasharray="1,7"
            stroke-linecap="round"
          />
          <g class="candidate-dot">
            <line
              x1="0"
              x2={compareCoords[0]}
              y1="-2"
              y2={compareCoords[1]}
              stroke="#132e53"
              stroke-width="2"
              vector-effect="non-scaling-stroke"
              in:fade={{ duration: 200, delay: 100 }}
            />
            <circle
              r={w * 0.057}
              cx={compareCoords[0]}
              cy={compareCoords[1]}
              fill="#fff"
              stroke="#132e53"
              stroke-width="2"
              vector-effect="non-scaling-stroke"
              in:fade={{ duration: 200, delay: 100 }}
            />
            <circle
              r={w * 0.057 * 0.75}
              cx={compareCoords[0]}
              cy={compareCoords[1]}
              fill="#386d9f"
              in:fade={{ duration: 200, delay: 100 }}
            />
          </g>
        </g>
      </svg>
    {/if}
  </div>
  <!-- {#if candidateHover}
		<div
			class="compare-detail"
			class:show={candidateHover}
			style="transform: translate({xCalc(compare[0] * 100)}px, 
		{Math.round(yCalc(compare[1] * 100))}px);"
			transition:fade={{ duration: 150 }}
		>
			<div class="compare-detail-wrapper">
				<p class="value">{labels[0]}: {(compare[0] * 100).toFixed(1)}%</p>
				<p class="value">{labels[1]}: {(compare[1] * 100).toFixed(1)}%</p>
			</div>
		</div>
	{/if}
	{#if circleHover}
		<div
			class="baseline-detail"
			class:show={circleHover}
			style="transform: translate({xCalc(baseline[0] * 100)}px, 
		{Math.round(yCalc(baseline[1] * 100) + baselineStDev * w * 0.2)}px);"
			transition:fade={{ duration: 150 }}
		>
			<div class="baseline-detail-wrapper">
				<p class="value">{labels[0]}: {(baseline[0] * 100).toFixed(1)}%</p>
				<p class="value">{labels[1]}: {(baseline[1] * 100).toFixed(1)}%</p>
			</div>
		</div>
	{/if} -->
  <div class="labels">
    <div class="label-y">{labels[1]}</div>
    <div class="label-x">{labels[0]}</div>
  </div>
</div>

<style>
  .gauge-wrapper {
    vertical-align: top;
    display: inline-block;
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .labels {
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-family: Quicksand;
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
    pointer-events: none;
  }

  .baseline-detail {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
  }
  .baseline-detail-wrapper {
    opacity: 1;
    position: absolute;
    left: 100%;
    width: max-content;
    transform: translate(-50%, 100%);
    border: 1px solid var(--c_gray-dark);
    border-radius: 500px;
    background-color: var(--c_gray-dark);
    pointer-events: none;
    transition: opacity 150ms ease-out;
    &.show {
      opacity: 1;
    }
  }
  .baseline-detail-wrapper.value {
    position: relative;
    padding: 0px 15px;
    color: var(--c_white);
    font-size: 0.75rem;
    text-align: center;
    text-transform: capitalize;
  }
  .compare-detail {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
  }
  .compare-detail-wrapper {
    opacity: 1;
    position: absolute;
    left: 100%;
    width: max-content;
    transform: translate(-50%, 100%);
    border: 1px solid var(--c_blue);
    border-radius: 500px;
    background-color: var(--c_blue);
    pointer-events: none;
    transition: opacity 150ms ease-out;
    &.show {
      opacity: 1;
    }
  }
  .compare-detail-wrapper.value {
    position: relative;
    padding: 0px 15px;
    color: var(--c_white);
    font-size: 0.75rem;
    text-align: center;
    text-transform: capitalize;
  }

  .circle-arrow {
    transform-origin: center;
  }
</style>
