import { writable, Writable } from "svelte/store";
import fetchNUI from '../utils/fetch';

interface exampleState {
  show: Writable<boolean>
}

const store = () => {
  const exampleStore: exampleState = {
    show: writable(false),
  }

  const methods = {
  }

  return {
    ...exampleStore,
    ...methods
  }
}

export default store();