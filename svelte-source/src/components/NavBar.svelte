<script>
	import { NavItems } from './../configs/nav.config';
	import NavItem from './atoms/NavItem.svelte';

	export let navItemSelected;
	export let activeNavItem;
</script>

<nav class="w-[75px] min-h-screen nav float-right flex flex-col">
	<div class="ps-logo w-full h-[80px]" />
	{#each NavItems as item}
		<NavItem {item} bind:navItemSelected bind:activeNavItem />
	{/each}
</nav>

<style>
	.nav {
		background: var(--color-darkerblue);
		border-left: 1px solid var(--color-grey);
	}
</style>
