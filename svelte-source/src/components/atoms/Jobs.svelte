<script lang="ts">
	import type { IJobs } from './../../interfaces/IJobs';
	import { Icons } from './../../enums/IconsEnum';
	import JobDetail from './JobDetail.svelte';
	import { JobDetails } from './../../enums/JobEnum';
	import Button from './Button.svelte';

	export let job: IJobs;
</script>

<main
	class="job w-full flex flex-col h-[350px] mt-[30px] b-rd-[5px] px-[22px] py-[33px] relative"
>
	<i
		class="{Icons.DeleteJob} job-delete absolute right-[10px] top-[10px] cursor-pointer"
	/>
	<div class="job-about">
		<i class="job-icon {job.icon} fa-xl" /> <br />
		<span class="job-name mt-[14px] block">{job.name}</span>
		<span class="job-description block">{job.description}</span>
	</div>
	<div class="job-details flex gap-[5px] justify-stretch mt-[30px]">
		<JobDetail icon={Icons.Salary} detail={JobDetails.Salary} />
		<JobDetail icon={Icons.Rank} detail={JobDetails.Rank} />
		<JobDetail icon={Icons.Active} detail={JobDetails.Active} />
	</div>
	<Button />
</main>

<style lang="scss">
	.job {
		background: var(--color-darkerblue);
		border: 1px solid var(--color-darkblue);

		&-delete {
			color: var(--color-darkblue);
		}

		&-name {
			font-size: 16pt;
		}

		&-description {
			font-size: 11pt;
		}

		&-icon {
			color: var(--color-green);
		}

		&-name {
			font-size: 16pt;
		}
	}
</style>
