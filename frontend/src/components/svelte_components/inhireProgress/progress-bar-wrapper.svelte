<script lang="ts">
  import ProgressBar from "./progress-bar.svelte";
  export let decimal = 0.5;
  export let label: string = "Label";
</script>

<div class="c-progress-bar-wrapper">
  <h5 class="label">{label}</h5>
  <div class="bar-wrap">
    <ProgressBar {decimal} />
    <div class="percent">{(decimal * 100).toFixed(1)}%</div>
  </div>
</div>

<style>
  .c-progress-bar-wrapper {
    width: 100%;
    margin: 0 0 15px 0;
  }

  .bar-wrap {
    gap: 10px;
    display: flex;
    align-items: center;
  }

  .percent {
    color: var(--c_blue);
    font-size: 0.75rem;
    font-weight: 600;
  }

  h5 {
    font-family: Quicksand, sans-serif;
    text-transform: capitalize;
  }
</style>
