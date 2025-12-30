import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";
import Contestant from "@/libs/models/contestant.models";

export async function GET(req, { params }) {
  const { pollsId } = await params;
  //if polls id is not present
  if (!pollsId) {
    return NextResponse.json(
      { error: "No poll found." },
      {
        status: 400,
      }
    );
  }
  try {
    await connectDatabase();
    // check if the poll even exist in the database
    const poll = await Polls.findById(pollsId);
    // if post does not exist return an error
    if (!poll) {
      return NextResponse.json(
        { error: "No poll found." },
        {
          status: 400,
        }
      );
    }
    // check if the contestant has any one with this poll id
    const contestant = await Contestant.find({ pollId: pollsId });
    return NextResponse.json(
      { contestant },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occurred while getting all contestants." },
      {
        status: 400,
      }
    );
  }
}

export async function POST(req, { params }) {
  const { userId, position } = await req.json();
  const { pollsId } = await params;
  // check if the user id exist
  if (!userId) {
    return NextResponse.json(
      { error: "User is unauthorized" },
      {
        status: 400,
      }
    );
  }
  // check if the polls id exist
  if (!pollsId) {
    return NextResponse.json(
      { error: "Invalid Parameter" },
      {
        status: 400,
      }
    );
  }

  // check the position
  if (!position || !position.trim()) {
    return NextResponse.json(
      { error: "Position is missing" },
      {
        status: 400,
      }
    );
  }
  // checking position length
  if (position.trim().length < 5) {
    return NextResponse.json(
      { error: "Position cant be less than 5 characters" },
      {
        status: 400,
      }
    );
  }

  // success message
  return NextResponse.json(
    { message: "POST a new contestant.", userId, position, pollsId },
    {
      status: 200,
    }
  );
}
