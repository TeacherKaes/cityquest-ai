export function createSession({ edition, config }) {
  return { id: crypto.randomUUID(), editionId: edition.id, teamName: config.teamName || "Team", level: config.level || "A2/B1", duration: Number(config.duration || 20), currentMission: 0, completed: {}, inventory: {}, chat: {}, createdAt: new Date().toISOString() };
}
export function getLandmark(edition,id){return edition.landmarks.find(l=>l.id===id)}
export function getNpc(edition,id){return edition.npcs.find(n=>n.id===id)}
export function getMission(edition,index){return edition.missions[index]}
export function getProgress(edition,session){return Math.round((Object.keys(session.completed||{}).length/edition.missions.length)*100)}
export function completeMission(edition,session){const mission=getMission(edition,session.currentMission);const inventory=mission.reward?{...session.inventory,[session.currentMission]:mission.reward}:session.inventory;return {...session,completed:{...session.completed,[session.currentMission]:true},inventory}}
export function moveMission(edition,session,index){const max=edition.missions.length-1;return {...session,currentMission:Math.max(0,Math.min(max,index))}}
export function expectedCode(edition){return edition.missions.filter(m=>m.reward).map(m=>m.reward).join("")}
export function currentCode(edition,session){return edition.missions.filter(m=>m.reward).map((m,i)=>session.inventory[i]||"?").join("")}
