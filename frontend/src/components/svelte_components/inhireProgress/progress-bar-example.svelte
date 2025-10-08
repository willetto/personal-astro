<script lang="ts">
  import ProgressBar from "./progress-bar.svelte";
  import ProgressBarWrapper from "./progress-bar-wrapper.svelte";
</script>

<section class="chart-section">
  <div class="chart-item" data-aos="fade-up" data-aos-duration="100">
    <h2 class="text-xl font-bold">Progress Bar Example #1</h2>
    <div data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
      <ProgressBarWrapper decimal={0.682} label="Project Completion" />
    </div>
    <div data-aos="fade-up" data-aos-duration="400" data-aos-delay="150">
      <ProgressBarWrapper decimal={0.453} label="Quality Score" />
    </div>
    <div data-aos="fade-up" data-aos-duration="400" data-aos-delay="200">
      <ProgressBarWrapper decimal={0.898} label="Team Satisfaction" />
    </div>
  </div>
  <div class="chart-item" data-aos="fade-up" data-aos-duration="300">
    <h2 class="text-xl font-bold">Progress Bar Example #2</h2>
    <div data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
      <ProgressBarWrapper decimal={1} label="Project Completion" />
    </div>
    <div data-aos="fade-up" data-aos-duration="400" data-aos-delay="150">
      <ProgressBarWrapper decimal={0.554} label="Quality Score" />
    </div>
    <div data-aos="fade-up" data-aos-duration="400" data-aos-delay="200">
      <ProgressBarWrapper decimal={0.156} label="Team Satisfaction" />
    </div>
  </div>
</section>

<style>
  .chart-section {
    margin-bottom: 4rem;
    background: #f8f9fa;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .chart-section {
      padding: 1rem;
    }
  }
</style>
