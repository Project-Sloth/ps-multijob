<script lang="ts">
	import type { JobDetails } from '../../enums/JobEnum';
	import type { Icons } from '../../enums/IconsEnum';
	export let icon: Icons;
	export let detail: JobDetails;
</script>

<div
	class="flex-1 detail b-2 content-center pt-[12px] pb-[5px] b-rd-2 items-center text-center"
>
	<i class="{icon} fa-lg r" />
	<div class="detail-text block f-s-[10pt] mt-[5px]">
		<small>{detail}: <span class="detail-value">backend</span></small>
	</div>
</div>

<style lang="scss">
	.detail {
		&-text {
			font-size: 10pt;
		}

		&-value {
			color: var(--color-green);
		}

		border-color: var(--color-darkblue);
	}
</style>
