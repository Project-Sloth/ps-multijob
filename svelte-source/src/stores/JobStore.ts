import { writable, Writable, get } from "svelte/store";
import fetchNUI from '../utils/fetch';
import type { Job, JobManifest, side, nuiUpdateJobMessage } from '../types/types';
import PanelStore from "./PanelStore";

export interface nuiOpenMessage {
  activeJob: string;
  onDuty: boolean;
  jobs: JobManifest;
  side: side;
}

interface JobState {
  jobManifest: Writable<JobManifest>;
  activeJob: Writable<string>;
  onDuty: Writable<boolean>;
}

const store = () => {
  const JobStore: JobState = {
    jobManifest: writable({
      "civilian": [],
      "whitelist": [],
    }),
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
        state[category] = state[category].filter((element: Job) => element.name != nuiName);
        return state;
      });
    },
    receiveOpenMessage(data: nuiOpenMessage) {
      JobStore.jobManifest.set(data.jobs);
      JobStore.activeJob.set(data.activeJob);
      JobStore.onDuty.set(data.onDuty);
      PanelStore.side.set(data.side || "right");
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
          changeJob.gradeLabel = data.gradeLabel;
          changeJob.salary = data.salary;
        }

        function newJob(): Job {
          return {
            name: data.name,
            label: data.label,
            description: data.description,
            salary: data.salary,
            gradeLabel: data.gradeLabel,
            grade: data.grade,
            active: 0,
            icon: data.icon,
          }
        }

        let findSameName = (job: Job) => {
          return job.name == data.name
        }

        const accessString: "civilian" | "whitelist" = data.isWhitelist ? "whitelist" : "civilian";
        let index = state[accessString]?.findIndex(findSameName);

        if (index != -1) {
          updateJob(accessString, index);
        } else {
          state[accessString] = [...state[accessString], newJob()]
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
      // Unselect current job by setting player to unemployed
      fetchNUI("selectjob", {
        name: 'unemployed',
        grade: 0,
      });
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