import { NextResponse } from "next/server";

export async function GET() {
    const databaseId = '783141eb17354a3288251224767e5499';
    const pageId = '618ebcb981fe49359dbb9d5e93ece114'
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${process.env.Notion_API_KEY}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        }
    });
    // const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    //     headers:{
    //         'Authorization': `Bearer ${process.env.Notion_API_KEY}`,
    //         'Notion-Version': '2022-06-28',
    //         'Content-Type': 'application/json'
    //     }
    // });
  
    const data = await res.json();
   

  return NextResponse.json(data);
}