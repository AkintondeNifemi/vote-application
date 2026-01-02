import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";

export async function GET(req, { params }) {
  const { pollsId } = await params;
  if (!pollsId) {
    return NextResponse.json(
      { error: "Poll ID is required" },
      {
        status: 400,
      }
    );
  }
  try {
    await connectDatabase();
    // check if the poll  exist
    const poll = await Polls.findById(pollsId)
      .select("voters")
      .populate("voters")
      .lean();
    // if no poll return an error
    if (!poll) {
      return NextResponse.json(
        { error: "Poll not found" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      { voters: poll.voters },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Unable to get Poll" },
      {
        status: 400,
      }
    );
  }
}
