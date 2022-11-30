import { writable, Writable } from "svelte/store";
import fetchNUI from '../utils/fetch';
import CivilianSVG from '../components/atoms/svgs/CivilianSVG.svelte';
import WhiteListSVG from '../components/atoms/svgs/WhitelistSVG.svelte';

interface panel {
  name: string;
  icon: any;
}

interface PanelState {
  show: Writable<boolean>;
  panelActive: Writable<string>;
  panels: Writable<Array<panel>>;
}

const panels: Array<panel> = [
  {
    name: "whitelist",
    icon: WhiteListSVG,
  },
  {
    name: "civilian",
    icon: CivilianSVG,
  }
]

const store = () => {
  const PanelStore: PanelState = {
    show: writable(false),
    panelActive: writable(""),
    panels: writable(panels),
  }

  const methods = {
    setActive(name: string) {
      PanelStore.panelActive.set(name);
    }
  }

  return {
    ...PanelStore,
    ...methods
  }
}

export default store();