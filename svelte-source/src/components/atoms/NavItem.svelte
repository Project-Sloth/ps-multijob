<script lang="ts">
	import PanelStore from "../../stores/PanelStore";

	export let icon: any;
	export let isActive: boolean;
	export let name: string;

	function navItemClicked(item: string): void {
		if (isActive) {
			PanelStore.setActive("");
		} else {
			PanelStore.setActive(item);
		}
	}
</script>

<div class={"navitem w-full h-[60px] flex justify-center items-center cursor-pointer duration-200 "+
	(isActive ? "border-r-4 border-r-[#02f1b5] bg-[var(--color-darkestblue)]":"border-r-4 border-r-transparent")}
	on:click={() => navItemClicked(name)}
>
	<div class="icon">
		<svelte:component this={icon} color={isActive ? "#02f1b5" : "#7f7f7e"}/>
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
