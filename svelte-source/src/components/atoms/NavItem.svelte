<script lang="ts">
	import type { INavItem } from '../../interfaces/INavigation';

	export let item: INavItem;
	export let navItemSelected: boolean;
	export let activeNavItem;

	$: activeNavItem = 'Whitelisted';

	function navItemClicked(item: string): void {
		activeNavItem = item;

		navItemSelected = true;
	}
</script>

<div
	on:click={() => navItemClicked(item.name)}
	class="navitem w-full h-[60px] flex justify-center items-center cursor-pointer relative"
	data-item={item.name}
>
	<i class="{item.icon} icon" />
	{#if activeNavItem === item.name}
		<span class="state w-1 h-full absolute right-0" />
	{/if}
</div>

<style lang="scss">
	.icon {
		font-size: 26px;
		color: var(--color-grey);
	}

	.active {
		color: var(--color-green);
		background-color: var(--color-darkestblue);
	}

	.active-state {
		background-color: var(--color-green);
	}

	.navitem:hover {
		background-color: var(--color-darkestblue);
	}
</style>
