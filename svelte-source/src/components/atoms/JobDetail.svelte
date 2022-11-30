<script lang="ts">
	export let icon: any = null;
	export let detail: string;
	export let value: string | number;
	export let svgSize: string;
</script>

<div class="flex flex-1 flex-col items-center gap-2 b-2 b-rd-2 border-[var(--color-darkblue)] pt-[14px] pb-[14px]">
	<div class="w-full flex justify-center text-white">
		<div class={svgSize}>
			<svelte:component this={icon}/>
		</div>
	</div>
	<div class="text-center">
		<p class="text-xs">
			{detail}:
			<span class="text-[var(--color-green)]">
				{value}
			</span>
		</p>
	</div>
</div>