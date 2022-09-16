<script lang="ts">
	import CategoryMenu from './components/CategoryMenu.svelte';
	import NavBar from './components/NavBar.svelte';
	import { EventHandler } from './utils/eventHandler';

	EventHandler();

	let navItemSelected: boolean = true;
	let activeNavItem: string;
</script>

<main class="min-h-screen flex justify-end">
	{#if navItemSelected}
		<CategoryMenu {activeNavItem} />
	{/if}
	<NavBar bind:navItemSelected bind:activeNavItem />
</main>

<style>
</style>
