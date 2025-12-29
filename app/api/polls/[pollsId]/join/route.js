import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";

export async function PUT(req, { params }) {
  const { userId } = await req.json();
  const { pollsId } = await params;
  try {
    await connectDatabase();
    // get the poll

    return NextResponse.json(
      { message: "Successfully updated poll", userId, pollsId },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Unable to join poll" },
      {
        status: 400,
      }
    );
  }
}
