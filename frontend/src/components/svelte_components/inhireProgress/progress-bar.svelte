<script lang="ts">
  import { onMount } from "svelte";

  export let decimal = 0;
  let percentColor = () => {
    if (decimal <= 0.4) return "#CF4835";
    else if (decimal >= 0.7) return "#367E75";
    else return "#EFB900";
  };

  let isVisible = false;
  let progressElement: HTMLDivElement;

  $: percentVal = decimal * 100;
  $: cssVarStyles = `--percentage:${percentVal}%; --percent-color: ${percentColor()}`;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.2 }
    );

    if (progressElement) {
      observer.observe(progressElement);
    }

    return () => {
      if (progressElement) {
        observer.unobserve(progressElement);
      }
    };
  });
</script>

<div class="wrapper">
  <div class="bar">
    <div
      bind:this={progressElement}
      class="progress"
      class:animate={isVisible}
      style={cssVarStyles}
    ></div>
  </div>
</div>

<style>
  .wrapper {
    width: 100%;
    min-width: 240px;
    max-width: 270px;
    margin: 7px 0px;
  }

  .bar,
  .progress {
    width: 100%;
    border-radius: 100px;
  }

  .bar {
    display: flex;
    position: relative;
    height: 18px;
    align-items: center;
    background-color: #d3d4d2;
    &::before,
    &::after {
      content: "";
      position: absolute;
      right: 35%;
      left: 35%;
      height: 6px;
      border-right: 1px solid #386d9f;
      border-left: 1px solid #386d9f;
    }
    &::before {
      top: -7px;
    }
    &::after {
      bottom: -7px;
    }
  }
  .progress {
    width: 10%;
    height: 20px;
    border: 1px solid #f5f7fa;
    background-color: var(--percent-color);
  }

  .progress.animate {
    width: var(--percentage);
    animation: percent 800ms ease-out forwards;
    animation-delay: 0s;
  }

  @keyframes percent {
    0% {
      width: 10%;
    }
    100% {
      width: var(--percentage);
    }
  }
</style>
