import { writable, Writable } from "svelte/store";
import type { side } from '../types/types';
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
  side: Writable<side>;
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
    panelActive: writable(""),
    panels: writable(panels),
    show: writable(false),
    side: writable("right"),
  }

  const methods = {
    handleKeyUp(event: KeyboardEvent) {
      if (event.key == "Escape") {
        methods.setShow(false);
        fetchNUI("closemenu", null);
      }
    },
    setActive(name: string) {
      PanelStore.panelActive.set(name);
    },
    setShow(show: boolean) {
      PanelStore.show.set(show);
    },
    setSide(side: side) {
      PanelStore.side.set(side);
    }
  }

  return {
    ...PanelStore,
    ...methods
  }
}

export default store();