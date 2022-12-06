<script lang="ts">
	import { fly } from 'svelte/transition';
	import CategoryMenu from './components/CategoryMenu.svelte';
	import NavBar from './components/NavBar.svelte';
	import { EventHandler } from './utils/eventHandler';
	import DebugMode from './stores/debugStore';
	import PanelStore from './stores/PanelStore';

	const { panelActive, show } = PanelStore;

	EventHandler();
	document.onkeyup = PanelStore.handleKeyUp;
</script>

{#if $show}
	<main class={"min-h-screen flex justify-end "+ (DebugMode ? "bg-dark-200": "bg-transparent")}>
		{#if $panelActive != ""}
			<div in:fly|local="{{x: 500, duration: 500}}" out:fly|local="{{x: 500, duration: 500}}">
				<CategoryMenu/>
			</div>
		{/if}
		<NavBar/>
	</main>
{/if}

<style>
</style>
