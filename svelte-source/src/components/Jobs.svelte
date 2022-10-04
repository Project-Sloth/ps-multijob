<script lang="ts">
	import { Icons } from '../enums/IconsEnum';
	import type { IJobs } from '../interfaces/IJobs';
	import JobDetail from './atoms/JobDetail.svelte';
	import { JobDetails } from '../enums/JobEnum';

	export let job: IJobs;

	let onDuty: boolean = false;

	function toggleJob(job: IJobs): void {
		onDuty = !onDuty;
	}
</script>

<main
	class="job w-full flex flex-col mt-[30px] b-rd-[5px] px-[22px] py-[33px] relative"
>
	<i
		class="{Icons.DeleteJob} job-delete absolute right-[10px] top-[10px] cursor-pointer"
	/>
	<div class="job-about">
		<i class="job-icon {job.icon} fa-xl" /> <br />
		<span class="job-name mt-[14px] block">{job.name}</span>
		<span class="job-description block"
			><small>{job.description}</small></span
		>
	</div>
	<div class="job-details flex gap-[5px] justify-stretch mt-[30px]">
		<JobDetail icon={Icons.Salary} detail={JobDetails.Salary} />
		<JobDetail icon={Icons.Rank} detail={JobDetails.Rank} />
		<JobDetail icon={Icons.Active} detail={JobDetails.Active} />
	</div>
	<div class="mt-6">
		<div class="job-select {job.name}">
			{#if !onDuty}
				<button
					class="set-duty b-rd-[5px] py-[10px] font-medium text-black flex-1 w-full"
					on:click={() => toggleJob(job)}
				>
					<i class={Icons.SelectJob} />
					<span class="ml-[5px] ">SELECT</span>
				</button>
			{/if}
			{#if onDuty}
				<div class="job-selected flex justify-between gap-2 h-full">
					<div
						class="flex flex-1 border-1 items-center justify-center b-rd-[5px]"
					>
						<i class={Icons.SelectJob} />
						<span class="block ml-[5px]">SELECTED</span>
					</div>
					<div class="flex-1">
						<button
							class="off-duty b-rd-[5px] py-[10px] font-medium flex-1 w-full"
							on:click={() => toggleJob(job)}
						>
							<i class={Icons.OffDuty} />
							<span class="ml-[5px] ">OFF DUTY</span>
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

		&-delete {
			color: var(--color-darkblue);
		}

		&-name {
			font-size: 14pt;
		}

		&-description {
			font-size: 11pt;
			line-height: 1em;
		}

		&-icon {
			color: var(--color-green);
		}

		&-selected {
			font-size: 14px;
		}

		.set-duty {
			background: var(--color-green);
		}

		.off-duty {
			border: 1px solid var(--color-orange);
			color: var(--color-orange);

			&:hover {
				background: var(--color-orange);
				color: var(--color-black);
				border: 1px solid var(--color-black);
			}
		}

		.set-duty,
		.off-duty {
			letter-spacing: 1px;
		}
	}
</style>
