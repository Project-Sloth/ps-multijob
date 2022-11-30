import { writable, Writable } from "svelte/store";
import fetchNUI from '../utils/fetch';

interface Job {
  name: string;
  description: string;
  salary: number;
  rank: string;
  active: number;
  icon: any;
}

type JobManifest = {
  [key: string]: Array<Job>
}

const mockJobManifest: JobManifest = {
  "whitelist": [
    {
      name: "police person",
      description: `Generate Lorem lpsum placeholder text.
      Select the number of characters, words, sentences or paragraphs, and hit generate!`,
      salary: 250,
      rank: "Regular",
      active: 0,
      icon: "",
    },
    {
      name: "police chief",
      description: "Blah blah blah",
      salary: 500,
      rank: "Boss",
      active: 1,
      icon: "",
    },
  ],
  "civilian": [
    {
      name: "taxi driver",
      description: `Generate Lorem lpsum placeholder text.
        Select the number of characters, words, sentences or paragraphs, and hit generate!`,
      salary: 150,
      rank: "Regular",
      active: 0,
      icon: "",
    },
    {
      name: "murdershot cashier",
      description: "Take people's order and serve them food",
      salary: 100,
      rank: "Cashier",
      active: 0,
      icon: "",
    }
  ],
}

interface PanelState {
  show: Writable<boolean>;
  jobManifest: Writable<JobManifest>;
  activeJob: Writable<string>;
}

const store = () => {
  const PanelStore: PanelState = {
    show: writable(false),
    jobManifest: writable(mockJobManifest),
    activeJob: writable(""),
  }

  const methods = {
    setActiveJob(jobName: string) {
      PanelStore.activeJob.set(jobName);
    },
    setOffDuty() {
      PanelStore.activeJob.set("");
    }
  }

  return {
    ...PanelStore,
    ...methods
  }
}

export default store();