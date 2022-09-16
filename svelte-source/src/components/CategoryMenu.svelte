<script lang="ts">
	import { JobConfig } from './../configs/jobs.config';
	import Jobs from './atoms/Jobs.svelte';
	export let activeNavItem: string;
</script>

<main class="w-[340px] min-h-screen block px-[28px] pt-[40px]">
	<div class="text-white">
		<span class="category">CATEGORY</span> <br />
		<span class="category-name text-white block mt-[-5px] font-medium"
			>Whitelist Jobs</span
		>
	</div>

	{#each JobConfig as job}
		<Jobs {job} />
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
