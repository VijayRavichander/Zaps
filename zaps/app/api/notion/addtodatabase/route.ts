import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";


const sampleData = [
  {
    Papers: {
      title: [{ type: "text", text: { content: "ToRA" } }],
    },
    Date: {
      date: { start: "2024-12-25" },
    },
    Tags: {
      multi_select: [{ name: "Inference" }],
    },
  },
  {
    Papers: {
      title: [{ type: "text", text: { content: "LoRA" } }],
    },
    Date: {
      date: { start: "2024-12-25" },
    },
    Tags: {
      multi_select: [{ name: "Training" }],
    },
  },
  {
    Papers: {
      title: [{ type: "text", text: { content: "DoRA" } }],
    },
    Date: {
      date: { start: "2024-12-25" },
    },
    Tags: {
      multi_select: [{ name: "PEFT" }],
    },
  },
];

export async function GET(req: NextRequest) {
  try {

    //[TODO] Add User Keys and DB Ids
    const apiKey = process.env.NOTION_API_KEY;
    const db_ID = process.env.NOTION_DATABASE_ID;

    const notion = new Client({ auth: apiKey });

    // Fetch the Data to Sent
    const sampleEntry = sampleData[2];

    console.log(sampleEntry);

    if (!db_ID) {
      return NextResponse.json(
        {
          message: "DB ID invalid",
        },
        {
          status: 500,
        }
      );
    }

    const newPage = await notion.pages.create({
      parent: {
        database_id: db_ID,
      },
      properties: sampleEntry,
    });

    console.log(newPage);


    return NextResponse.json({
      message: "Done"
    }, {
      status: 200
    })
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 500,
      }
    );
  }
}
