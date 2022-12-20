export interface Job {
  name: string;
  label: string;
  description: string;
  salary: number;
  gradeLabel: string;
  grade: number;
  active: number;
  icon: string;
}

export interface nuiUpdateJobMessage extends Omit<Job, "active"> {
  isWhitelist: boolean;
  onDuty: boolean;
}

export interface JobManifest {
  "whitelist": Array<Job>;
  "civilian": Array<Job>;
}

export type side = "left" | "right";