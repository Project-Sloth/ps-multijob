export interface Job {
  name: string;
  label: string;
  description: string;
  salary: number;
  grade_label: string;
  grade: number;
  active: number;
  icon: string;
}

export interface JobManifest {
  "whitelist": Array<Job>;
  "civilian": Array<Job>;
}

export type side = "left" | "right";