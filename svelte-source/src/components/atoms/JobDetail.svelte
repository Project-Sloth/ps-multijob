<script lang="ts">
	import type { JobDetails } from './../../enums/JobEnum';
	import type { Icons } from './../../enums/IconsEnum';
	export let icon: Icons;
	export let detail: JobDetails;
</script>

<div
	class="detail b-2 content-center pt-[10px] pb-[5px] b-rd-2 items-center text-center"
>
	<i class="{icon} fa-lg r" />
	<span class="detail-text block f-s-[10pt] mt-[5px]"
		><small>{detail}: $150</small></span
	>
</div>

<style lang="scss">
	.detail {
		flex: 1;
		&-text {
			font-size: 10pt;
		}

		border-color: var(--color-darkblue);
	}
</style>
