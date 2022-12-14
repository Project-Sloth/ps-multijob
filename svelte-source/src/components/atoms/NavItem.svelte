<script lang="ts">
	import PanelStore from "../../stores/PanelStore";
	import type { side } from '../../types/types';

	export let icon: any;
	export let isActive: boolean;
	export let name: string;
	export let side: side;

	function navItemClicked(item: string): void {
		if (isActive) {
			PanelStore.setActive("");
		} else {
			PanelStore.setActive(item);
		}
	}
</script>

<div class={"navitem w-full h-[60px] flex justify-center items-center cursor-pointer duration-200 "+
	(side == "left" ? "border-l-4 " : "border-r-4 ")+
	(isActive ? side == "left" ? "border-l-[var(--color-green)] bg-[var(--color-darkestblue)] ": "border-r-[var(--color-green)] bg-[var(--color-darkestblue)] "
	: side == "left" ? "border-l-transparent ": "border-r-transparent ")}
	on:click={() => navItemClicked(name)}
>
	<div class="icon">
		<svelte:component this={icon} color={isActive ? "var(--color-green)" : "var(--color-grey)"}/>
	</div>
</div>

<style>
	.icon {
		width: 40%;
		color: var(--color-lightestgrey);
	}
	.navitem:hover {
		background-color: var(--color-darkestblue);
	}
</style>
