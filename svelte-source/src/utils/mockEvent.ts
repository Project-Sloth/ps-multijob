import type { JobManifest } from '../types/types';
import type { nuiOpenMessage } from '../stores/JobStore';

export default function mockEventCall(data: unknown = {}) {
  window.dispatchEvent(
    new MessageEvent("message", {data})
  );
};

export function exampleCall() {
  setTimeout(() => {
    mockEventCall({
      action: 'show',
      data: {
        header: "Some Header!",
      },
    });
  }, 100);  
};

export function mockJobMenuOpen() {
  const mockJobManifest: JobManifest = {
    "whitelist": [
      {
        name: "police person",
        label: "police person",
        description: `Generate Lorem lpsum placeholder text.
        Select the number of characters, words, sentences or paragraphs, and hit generate!`,
        salary: 250,
        gradeLabel: "Regular",
        grade: 0,
        active: 0,
        icon: "fa-solid fa-trash-can",
      },
      {
        name: "police chief",
        label: "police chief",
        description: "Blah blah blah",
        salary: 500,
        gradeLabel: "Boss",
        grade: 0,
        active: 1,
        icon: "",
      },
      {
        name: "police chief2",
        label: "police chief2",
        description: "Blah blah blah",
        salary: 500,
        gradeLabel: "Boss",
        grade: 0,
        active: 1,
        icon: "",
      },
      {
        name: "police chief3",
        label: "police chief3",
        description: "Blah blah blah",
        salary: 500,
        gradeLabel: "Boss",
        grade: 0,
        active: 1,
        icon: "",
      },
      {
        name: "police chief4",
        label: "police chief4",
        description: "Blah blah blah",
        salary: 500,
        gradeLabel: "Boss",
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
        gradeLabel: "Regular",
        grade: 0,
        active: 0,
        icon: "",
      },
      {
        name: "murdershot1",
        label: "murdershot1",
        description: "Take people's order and serve them food",
        salary: 100,
        gradeLabel: "Cashier",
        grade: 0,
        active: 0,
        icon: "",
      },
      {
        name: "murdershot2",
        label: "murdershot2",
        description: "Take people's order and serve them food",
        salary: 100,
        gradeLabel: "Cashier",
        grade: 0,
        active: 0,
        icon: "",
      },
      {
        name: "murdershot3",
        label: "murdershot3",
        description: "Take people's order and serve them food",
        salary: 100,
        gradeLabel: "Cashier",
        grade: 0,
        active: 0,
        icon: "",
      }
    ],
  }
  setTimeout(() => {
    let sendData: nuiOpenMessage = {
      activeJob: "murdershot1",
      jobs: mockJobManifest,
      onDuty: true,
      side: "right",
    }
    mockEventCall({
      action: 'sendjobs',
      ...sendData,
    });
  }, 1000);  
}