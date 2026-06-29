import { NextResponse } from "next/server";
import { getEdition } from "../../../../lib/editionRegistry";
import { createSession } from "../../../../lib/questEngine";
import { getSupabaseAdmin, hasSupabaseConfig } from "../../../../lib/supabaseServer";
export async function POST(request){const body=await request.json();const edition=getEdition(body.editionId||"london");const session=createSession({edition,config:body});if(!hasSupabaseConfig()) return NextResponse.json({mode:"local",session});const supabase=getSupabaseAdmin();const {data,error}=await supabase.from("cityquest_sessions").insert({edition_id:session.editionId,team_name:session.teamName,level:session.level,duration_minutes:session.duration,current_mission:session.currentMission,state:session}).select().single();if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({mode:"supabase",sessionId:data.id,session:{...session,id:data.id}})}
