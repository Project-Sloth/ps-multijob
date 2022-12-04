import { writable, Writable } from "svelte/store";
import fetchNUI from '../utils/fetch';

interface Job {
  name: string;
  label: string;
  description: string;
  salary: number;
  grade_label: string;
  grade: number;
  active: number;
  icon: any;
}

type JobManifest = {
  "whitelist": Array<Job>;
  "civilian": Array<Job>;
}

interface nuiOpenMessage {
  action: string;
  activeJob: string;
  jobs: JobManifest;
}

const mockJobManifest: JobManifest = {
  "whitelist": [
    {
      name: "police person",
      label: "blah",
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
      label: "blah",
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
      label: "blah",
      description: `Generate Lorem lpsum placeholder text.
        Select the number of characters, words, sentences or paragraphs, and hit generate!`,
      salary: 150,
      grade_label: "Regular",
      grade: 0,
      active: 0,
      icon: "",
    },
    {
      name: "murdershot cashier",
      label: "blah",
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
}

const store = () => {
  const JobStore: JobState = {
    jobManifest: writable(mockJobManifest),
    activeJob: writable(""),
  }

  const methods = {
    deleteJob(jobName: string, nuiName: string, nuiRank: string) {
      // TODO: need to remove job from our current arrays
      fetchNUI("removejob", {
        name: nuiName,
        grade: nuiRank,
      });
    },
    receiveOpenMessage(data: nuiOpenMessage) {
      JobStore.jobManifest.set(data.jobs);
      JobStore.activeJob.set(data.activeJob);
    },
    setActiveJob(jobName: string, nuiName: string, nuiRank: string) {
      JobStore.activeJob.set(jobName);
      fetchNUI("selectjob", {
        name: nuiName,
        grade: nuiRank,
      });
    },
    setOffDuty() {
      JobStore.activeJob.set("");
    }
  }

  return {
    ...JobStore,
    ...methods
  }
}

export default store();