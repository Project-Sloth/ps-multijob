<script lang="ts">
	import JobDetail from './atoms/JobDetail.svelte';
	import SalarySVG from './atoms/svgs/SalarySVG.svelte';
	import RankSVG from './atoms/svgs/RankSVG.svelte';
	import ActiveSVG from './atoms/svgs/ActiveSVG.svelte';
	import SelectSVG from './atoms/svgs/SelectSVG.svelte';
	import DeleteSVG from './atoms/svgs/DeleteSVG.svelte';
	import ClockSVG from './atoms/svgs/ClockSVG.svelte';
	import TaxiSVG from './atoms/svgs/TaxiSVG.svelte';
	import JobStore from '../stores/JobStore';

	export let name: string;
	export let nuiName: string;
	export let icon: any;
	export let description: string;
	export let salary: number;
	export let rank: string;
	export let nuiRank: string;
	export let active: number;

	const { activeJob, setActiveJob, setOffDuty } = JobStore;

	let onDuty: boolean = false;
	$: onDuty = $activeJob == name;

</script>

<main class="job w-full flex flex-col mt-[30px] b-rd-[10px] px-[22px] py-[33px] relative select-none">
	<div class="text-[var(--color-darkblue)] absolute right-[10px] top-[10px] cursor-pointer">
		<svelte:component this={DeleteSVG} />
	</div>
	<div class="job-about">
		<div class="w-6 text-[var(--color-green)]">
			<svelte:component this={TaxiSVG}/>
		</div>
		<p class="text-xl tracking-wide mt-[8px] capitalize">
			{name}
		</p>
		<p class="text-sm mt-[2px] text-[var(--color-lightestgrey)]">
			{description}
		</p>
	</div>
	<div class="job-details flex gap-[12px] justify-stretch mt-[30px]">
		<JobDetail icon={SalarySVG} detail="Salary" value={salary} svgSize="w-[0.8rem]"/>
		<JobDetail icon={RankSVG}   detail="Rank"   value={rank} svgSize="w-[1.4rem]"/>
		<JobDetail icon={ActiveSVG} detail="Active" value={active} svgSize="w-[1.1rem]"/>
	</div>
	<div class="mt-8">
		<div class="job-select">
			{#if !onDuty}
				<button class="bg-[var(--color-green)] flex flex-row h-11 items-center justify-center gap-1 b-rd-[5px] py-[10px] font-medium text-black flex-1 w-full"
					on:click={() => setActiveJob(name, nuiName, nuiRank)}
				>
					<div class="w-4">
						<svelte:component this={SelectSVG} />
					</div>
					<p class="ml-[5px] uppercase tracking-wide">select</p>
				</button>
			{/if}
			{#if onDuty}
				<div class="flex flex-row justify-between gap-2">
						<div class="flex flex-1 flex-row gap-2 border-1 b-rd-[5px] justify-center items-center h-11">
							<div class="w-5">
								<svelte:component this={SelectSVG} />
							</div>
							<p class="uppercase tracking-wide">selected</p>
						</div>
					<div class="flex-1">
						<button class="flex flex-row justify-center items-center gap-1 h-11 text-[var(--color-orange)] border-1
							border-[var(--color-orange)] b-rd-[5px] py-[10px]
							font-medium flex-1 w-full hover:bg-[var(--color-orange)] hover:text-black"
							on:click={() => setOffDuty()}
						>
							<div class="w-5">
								<svelte:component this={ClockSVG} />
							</div>
							<p class="ml-[5px] uppercase tracking-wide">off duty</p>
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</main>

<style lang="scss">
	.job {
		background: var(--color-darkerblue);
		border: 1px solid var(--color-darkblue);

		&-icon {
			color: var(--color-green);
		}
	}
</style>
