<script lang="ts">
	import { fly } from 'svelte/transition';
	import CategoryMenu from './components/CategoryMenu.svelte';
	import NavBar from './components/NavBar.svelte';
	import { EventHandler } from './utils/eventHandler';
	import DebugMode from './stores/debugStore';
	import PanelStore from './stores/PanelStore';
	import JobStore from './stores/JobStore';
	import { mockJobMenuOpen } from './utils/mockEvent';

	const { panelActive, show, side } = PanelStore;
	const { jobManifest } = JobStore;

	EventHandler();
	document.onkeyup = PanelStore.handleKeyUp;

	if (DebugMode) {
		mockJobMenuOpen();
	}

</script>

{#if $show}
	<main class={"min-h-screen flex"+($side == "right" ? " justify-end ":" ")+(DebugMode ? "bg-dark-200": "bg-transparent")}>
		{#if $side == "right"}
			{#if $panelActive != ""}
				<div in:fly|local="{{x: 500, duration: 500}}" out:fly|local="{{x: 500, duration: 500}}">
					<CategoryMenu jobArray={$jobManifest[$panelActive] || []} panelName={$panelActive}/>
				</div>
			{/if}
			<NavBar side={$side}/>
		{:else}
			<NavBar side={$side}/>
			{#if $panelActive != ""}
				<div in:fly|local="{{x: -500, duration: 500}}" out:fly|local="{{x: -500, duration: 500}}">
					<CategoryMenu jobArray={$jobManifest[$panelActive] || []} panelName={$panelActive}/>
				</div>
			{/if}
		{/if}
	</main>
{/if}

<style>
</style>
