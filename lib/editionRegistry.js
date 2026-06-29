import london from "../content/editions/london/edition.json";
import museum from "../content/editions/museum/edition.json";
import biology from "../content/editions/biology/edition.json";
import chemistry from "../content/editions/chemistry/edition.json";
import nw from "../content/editions/nw/edition.json";

export const editions = { london, museum, biology, chemistry, nw };

export function listEditions() { return Object.values(editions); }
export function getEdition(id = "london") { return editions[id] || london; }
