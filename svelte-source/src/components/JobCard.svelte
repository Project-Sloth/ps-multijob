<script lang="ts">
	import JobDetail from './atoms/JobDetail.svelte';
	import SalarySVG from './atoms/svgs/SalarySVG.svelte';
	import RankSVG from './atoms/svgs/RankSVG.svelte';
	import ActiveSVG from './atoms/svgs/ActiveSVG.svelte';
	import SelectSVG from './atoms/svgs/SelectSVG.svelte';
	import CrossMarkSVG from './atoms/svgs/CrossMarkSVG.svelte';
	import DeleteSVG from './atoms/svgs/DeleteSVG.svelte';
	import ClockSVG from './atoms/svgs/ClockSVG.svelte';
	import TaxiSVG from './atoms/svgs/TaxiSVG.svelte';
	import JobStore from '../stores/JobStore';

	export let name: string;
	export let nuiName: string;
	export let icon: string = "";
	export let description: string = "";
	export let salary: number;
	export let rank: string;
	export let nuiRank: number;
	export let active: number;
	export let category: string;

	function getDutyText(onDuty: boolean) {
		return onDuty ? "On Duty" : "Off Duty";
	}

	function getSelectText(select: boolean) {
		return select ? "Selected" : "Unselect";
	}

	const { activeJob, onDuty, setActiveJob, toggleDuty, unSetActiveJob, deleteJob } = JobStore;

	let isActive: boolean = false;
	$: isActive = $activeJob == nuiName;
	$: dutyText = getDutyText($onDuty);

	let onDutyHover: boolean = false;
	let transitionOnDuty: boolean = false;
	let transitionOffDuty: boolean = false;

	function handleOnDutyMouseEnter() {
		dutyText = getDutyText(!$onDuty);
		onDutyHover = true;
	}

	function handleOnDutyMouseLeave() {
		dutyText = getDutyText($onDuty);
		onDutyHover = false;
		transitionOnDuty = false;
		transitionOffDuty = false;
	}

	function handleDutyChange() {
		if ($onDuty) {
			transitionOffDuty = true;
			transitionOnDuty = false;
		} else {
			transitionOnDuty = true;
			transitionOffDuty = false;
		}
		toggleDuty();
	}

	let selectText: string = "selected";
	let selectHover: boolean = false;

	function handleOnSelectMouseEnter() {
		selectText = getSelectText(false);
		selectHover = true;
	}

	function handleOnSelectMouseLeave() {
		selectText = getSelectText(true);
		selectHover = false;
	}

	function handleUnSelectJob() {
		unSetActiveJob();
		selectHover = false;
		selectText = "selected";
	}
</script>

<main class="job w-full flex flex-col gap-4 mb-[30px] b-rd-[10px] px-[22px] py-5
	relative select-none bg-[var(--color-darkerblue)] border border-[var(--color-darkblue)]">
	<div class="flex flex-row items-center gap-2 text-center">
		<div class="w-6 text-[var(--color-green)]">
			{#if icon}
				<i
					class="{icon} fa-lg"
				/>
			{:else}
				<svelte:component this={TaxiSVG} />
			{/if}
		</div>
		<p class="text-xl tracking-wide capitalize">
			{name}
		</p>
		<div class="w-7 text-[var(--color-darkblue)] cursor-pointer ml-auto hover:text-[var(--color-orange)]" 
			on:click={() => deleteJob(nuiName, nuiRank, category)}>
			<svelte:component this={DeleteSVG} />
		</div>
	</div>
	<p class="text-sm text-[var(--color-lightestgrey)]">
		{description}
	</p>
	<div class="job-details flex gap-[12px] justify-stretch">
		<JobDetail icon={SalarySVG} detail="Salary" value={salary} svgSize="w-[0.8rem]"/>
		<JobDetail icon={RankSVG}   detail="Rank"   value={rank} svgSize="w-[1.4rem]"/>
		<JobDetail icon={ActiveSVG} detail="Active" value={active} svgSize="w-[1.1rem]"/>
	</div>
	<div class="mt-2">
		{#if !isActive}
			<button class="bg-[var(--color-green)] flex flex-row h-11 items-center justify-center gap-1 b-rd-[5px] py-[10px] font-medium text-black flex-1 w-full"
				on:click={() => setActiveJob(nuiName, nuiName, nuiRank)}
			>
				<div class="w-4">
					<svelte:component this={SelectSVG} />
				</div>
				<p class="ml-[5px] uppercase tracking-wide">select</p>
			</button>
		{/if}
		{#if isActive}
			<div class="flex flex-row justify-between gap-2">
					<button class={"flex flex-1 flex-row gap-2 border-1 b-rd-[5px] justify-center items-center h-11"+
						(selectHover ? "border-[var(--color-orange)] text-[var(--color-orange)]":"")}
						on:click={handleUnSelectJob} on:mouseenter={handleOnSelectMouseEnter} on:mouseleave={handleOnSelectMouseLeave}>
						{#if !selectHover}
							<div class="w-5">
								<svelte:component this={SelectSVG}/>
							</div>
						{/if}
						<p class="uppercase tracking-wide">
							{selectText}
						</p>
					</button>
				<div class="flex-1">
					<button class={`flex flex-row justify-center items-center gap-1 h-11 border-1 b-rd-[5px] py-[10px] font-medium flex-1 w-full ` +
						($onDuty ?
							"border-[var(--color-green)]  text-[var(--color-green)] "
						: "border-[var(--color-orange)] text-[var(--color-orange)] ")+
						($onDuty && !transitionOnDuty ? "hover:border-[var(--color-orange)] hover:text-[var(--color-orange)]":"")+
						(!$onDuty && !transitionOffDuty ? "hover:border-[var(--color-green)]  hover:text-[var(--color-green)]":"")
						}
						on:click={handleDutyChange} on:mouseenter={handleOnDutyMouseEnter} on:mouseleave={handleOnDutyMouseLeave}
					>
						{#if ($onDuty && !onDutyHover) || transitionOnDuty}
							<div class="w-5">
								<svelte:component this={ClockSVG} />
							</div>
						{/if}
						{#if (!$onDuty && !onDutyHover) || transitionOffDuty}
							<div class="w-[0.9rem]">
								<svelte:component this={CrossMarkSVG} />	
							</div>
						{/if}
						<p class="ml-[5px] uppercase tracking-wide">{dutyText}</p>
					</button>
				</div>
			</div>
		{/if}
	</div>
</main>
