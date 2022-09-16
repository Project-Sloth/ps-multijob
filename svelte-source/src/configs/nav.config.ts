import { NavItemsEnum } from './../enums/NavEnum';
import type { INavItem } from '../interfaces/INavigation';
import { Icons } from 'src/enums/IconsEnum';

export const NavItems: Array<INavItem> = [
	{
		name: NavItemsEnum.Whitelisted,
		icon: Icons.Whitelist,
	},
	{
		name: NavItemsEnum.Criminal,
		icon: 'fa-solid fa-times',
	},
];
