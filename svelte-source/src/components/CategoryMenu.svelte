<script lang="ts">
	import JobCard from './JobCard.svelte';
	import type { Job } from '../types/types';

	export let jobArray: Array<Job> = [];
	export let panelName: string = "";

</script>

<main class="w-[380px] min-h-screen block pt-[20px] select-none">
	<div class="text-white px-[28px] pb-4">
		<p class="category">CATEGORY</p>
		<p class="category-name text-white block mt-[-5px] font-medium capitalize">
			{panelName} Jobs
		</p>
	</div>

	<div class="max-h-screen overflow-y-auto px-[28px] pb-20">
		{#each jobArray as job (job.name)}
			<JobCard name={job.label} nuiName={job.name} nuiRank={job.grade} icon={job.icon} description={job.description}
				salary={job.salary} rank={job.gradeLabel} active={job.active} category={panelName}/>
		{/each}
	</div>
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
