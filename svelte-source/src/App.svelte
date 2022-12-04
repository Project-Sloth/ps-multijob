<script lang="ts">
	import CategoryMenu from './components/CategoryMenu.svelte';
	import NavBar from './components/NavBar.svelte';
	import { EventHandler } from './utils/eventHandler';
	import DebugMode from './stores/debugStore';
	import PanelStore from './stores/PanelStore';

	const { panelActive, show } = PanelStore;

	EventHandler();
</script>

{#if $show}
<main class={"min-h-screen flex justify-end "+ (DebugMode ? "bg-dark-200": "bg-transparent")}>
	{#if $panelActive != ""}
		<CategoryMenu/>
	{/if}
	<NavBar/>
</main>
{/if}

<style>
</style>
