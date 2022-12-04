import { onMount, onDestroy } from "svelte";
import JobStore from '../stores/JobStore';
import PanelStore from '../stores/PanelStore';

interface nuiMessage {
  data: {
    action: string,
    topic?: string,
    [key: string]: any,
  },
}

export function EventHandler() {
  function mainEvent(event: nuiMessage) {
    switch (event.data.action) {
      case "sendjobs":
        JobStore.receiveOpenMessage(event.data as any);
        PanelStore.setShow(true);
        break;
    }
  }

  onMount(() => window.addEventListener("message", mainEvent));
  onDestroy(() => window.removeEventListener("message", mainEvent));
}

export function handleKeyUp(event) {
  const charCode = event.key;
  if (charCode == "Escape") {
  }
}