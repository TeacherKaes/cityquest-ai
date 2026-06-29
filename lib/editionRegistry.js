import london from "../content/editions/london/edition.json";
import museum from "../content/editions/museum/edition.json";
export const editions = { london, museum };
export function listEditions() { return Object.values(editions); }
export function getEdition(id = "london") { return editions[id] || london; }
