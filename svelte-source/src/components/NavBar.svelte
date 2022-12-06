<script>
	import NavItem from './atoms/NavItem.svelte';
	import PanelStore from '../stores/PanelStore';

	const { panelActive, panels } = PanelStore;
</script>

<nav class="w-[80px] min-h-screen nav float-right flex flex-col z-10">
	<div class="ps-logo w-full h-[80px]"/>
	{#each $panels as item}
		<NavItem name={item.name} isActive={item.name == $panelActive} icon={item.icon}/>
	{/each}
</nav>

<style>
	.nav {
		background: var(--color-darkerblue);
		border-left: 1px solid var(--color-darkblue);
	}
</style>
