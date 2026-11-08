import {NextResponse} from "next/server";
import {isAdmin,readCms,writeCms} from "@/lib/github-cms";
export const dynamic="force-dynamic";
export async function GET(){if(!await isAdmin())return NextResponse.json({error:"Non autorisé"},{status:401});try{return NextResponse.json(await readCms())}catch(e:any){return NextResponse.json({error:e.message||"Lecture impossible"},{status:500})}}
export async function PUT(req:Request){if(!await isAdmin())return NextResponse.json({error:"Non autorisé"},{status:401});try{const data=await req.json();if(!Array.isArray(data.articles)||!data.settings||typeof data.settings!=="object")return NextResponse.json({error:"Format de contenu invalide"},{status:400});await writeCms(data);return NextResponse.json({ok:true,message:"Enregistré dans GitHub. Le redéploiement Vercel se déclenche automatiquement."})}catch(e:any){return NextResponse.json({error:e.message||"Enregistrement impossible"},{status:500})}}
