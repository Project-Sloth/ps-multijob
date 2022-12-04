<script lang="ts">
	import JobCard from './JobCard.svelte';
	import PanelStore from '../stores/PanelStore';
	import JobStore from '../stores/JobStore';

	const { panelActive } = PanelStore;
	const { jobManifest } = JobStore;
</script>

<main class="w-[380px] min-h-screen block px-[28px] pt-[40px] select-none">
	<div class="text-white">
		<span class="category">CATEGORY</span> <br />
		<span class="category-name text-white block mt-[-5px] font-medium capitalize">
			{$panelActive} Jobs
		</span>
	</div>

	{#each $jobManifest[$panelActive] as job}
		<JobCard name={job.label} nuiName={job.name} nuiRank={job.grade} icon={job.icon} description={job.description}
			salary={job.salary} rank={job.grade_label} active={job.active} />
	{/each}
</main>

<style lang="scss">
	main {
		background: var(--color-darkestblue);
		color: white;
	}

	.category {
		font-size: 10pt;
		color: var(--color-lightestgrey);
	}

	.category-name {
		font-size: 15pt;
		letter-spacing: 1px;
	}
</style>
