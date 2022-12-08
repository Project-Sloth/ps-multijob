import { writable, Writable, get } from "svelte/store";
import fetchNUI from '../utils/fetch';
import type { Job } from '../types/types';
import { element } from "svelte/internal";

type JobManifest = {
  "whitelist": Array<Job>;
  "civilian": Array<Job>;
}

interface nuiOpenMessage {
  action: string;
  activeJob: string;
  onDuty: boolean;
  jobs: JobManifest;
}

const mockJobManifest: JobManifest = {
  "whitelist": [
    {
      name: "police person",
      label: "police person",
      description: `Generate Lorem lpsum placeholder text.
      Select the number of characters, words, sentences or paragraphs, and hit generate!`,
      salary: 250,
      grade_label: "Regular",
      grade: 0,
      active: 0,
      icon: "",
    },
    {
      name: "police chief",
      label: "police chief",
      description: "Blah blah blah",
      salary: 500,
      grade_label: "Boss",
      grade: 0,
      active: 1,
      icon: "",
    },
    {
      name: "police chief2",
      label: "police chief2",
      description: "Blah blah blah",
      salary: 500,
      grade_label: "Boss",
      grade: 0,
      active: 1,
      icon: "",
    },
    {
      name: "police chief3",
      label: "police chief3",
      description: "Blah blah blah",
      salary: 500,
      grade_label: "Boss",
      grade: 0,
      active: 1,
      icon: "",
    },
    {
      name: "police chief4",
      label: "police chief4",
      description: "Blah blah blah",
      salary: 500,
      grade_label: "Boss",
      grade: 0,
      active: 1,
      icon: "",
    },
  ],
  "civilian": [
    {
      name: "taxi driver",
      label: "taxi driver",
      description: `Generate Lorem lpsum placeholder text.
        Select the number of characters, words, sentences or paragraphs, and hit generate!`,
      salary: 150,
      grade_label: "Regular",
      grade: 0,
      active: 0,
      icon: "",
    },
    {
      name: "murdershot1",
      label: "murdershot1",
      description: "Take people's order and serve them food",
      salary: 100,
      grade_label: "Cashier",
      grade: 0,
      active: 0,
      icon: "",
    },
    {
      name: "murdershot2",
      label: "murdershot2",
      description: "Take people's order and serve them food",
      salary: 100,
      grade_label: "Cashier",
      grade: 0,
      active: 0,
      icon: "",
    },
    {
      name: "murdershot3",
      label: "murdershot3",
      description: "Take people's order and serve them food",
      salary: 100,
      grade_label: "Cashier",
      grade: 0,
      active: 0,
      icon: "",
    }
  ],
}

interface JobState {
  jobManifest: Writable<JobManifest>;
  activeJob: Writable<string>;
  onDuty: Writable<boolean>;
}

interface nuiUpdateJobMessage {
  name: string;
  onDuty: boolean;
  gradeLabel: string;
  grade: number;
  payment: number;
}

const store = () => {
  const JobStore: JobState = {
    jobManifest: writable(mockJobManifest),
    activeJob: writable("police person"),
    onDuty: writable(false),
  }

  const methods = {
    deleteJob(nuiName: string, nuiRank: number, category: string) {
      fetchNUI("removejob", {
        name: nuiName,
        grade: nuiRank,
      });
      // Remove job from list
      JobStore.jobManifest.update((state) => {
        state[category] = state[category].filter((element) => element.name != nuiName);
        return state;
      });
    },
    receiveOpenMessage(data: nuiOpenMessage) {
      JobStore.jobManifest.set(data.jobs);
      JobStore.activeJob.set(data.activeJob);
      JobStore.onDuty.set(data.onDuty);
    },
    recieveUpdateJob(data: nuiUpdateJobMessage) {
      const activeJob: string = get(JobStore.activeJob);
      if (activeJob == data.name) {
        JobStore.onDuty.set(data.onDuty);
      }

      JobStore.jobManifest.update((state) => {
        function updateJob(kind: "whitelist" | "civilian", index: number) {
          let changeJob = state[kind][index];
          changeJob.grade = data.grade;
          changeJob.grade_label = data.gradeLabel;
          changeJob.salary = data.payment;
        }

        let findSameName = (job: Job) => {
          return job.name == data.name
        }
        
        let index = state.civilian.findIndex(findSameName);

        if (index != -1) {
          updateJob("civilian", index);
          return state;
        }

        index = state.whitelist.findIndex(findSameName);

        if (index != -1) {
          updateJob("whitelist", index);
        }

        return state;
      })
    },
    async setActiveJob(jobName: string, nuiName: string, nuiRank: number) {
      JobStore.activeJob.set(jobName);
      // Needs to give back onDuty
      let data = await fetchNUI("selectjob", {
        name: nuiName,
        grade: nuiRank,
      });
      JobStore.onDuty.set(data?.onDuty);
    },
    unSetActiveJob() {
      JobStore.activeJob.set("");
      JobStore.onDuty.set(false);
    },
    toggleDuty() {
      JobStore.onDuty.update(state => !state);
      fetchNUI('toggleduty', null);
    }
  }

  return {
    ...JobStore,
    ...methods
  }
}

export default store();