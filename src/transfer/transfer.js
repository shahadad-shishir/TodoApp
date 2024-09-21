import { exportTask } from "./export.js";
import { importTask } from "./import.js";


export function loadTransfer() {
  exportTask.init();
  importTask.init();
}