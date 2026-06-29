import { NextResponse } from "next/server";
import { getEdition } from "../../../../lib/editionRegistry";
import { getMission, getNpc } from "../../../../lib/questEngine";
import { callCityQuestAI } from "../../../../lib/ai";
export async function POST(request){try{const body=await request.json();const edition=getEdition(body.editionId);const mission=getMission(edition,body.missionIndex||0);const npc=getNpc(edition,mission.npc);const reply=await callCityQuestAI({edition,mission,npc,userMessage:body.message||""});return NextResponse.json({reply})}catch{return NextResponse.json({reply:"Technical problem. Please try again."})}}
