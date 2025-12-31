import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { pollsId, contestantId } = await params;
  const { userId } = await req.json();
  // validate inputs
  if (!pollsId) {
    return NextResponse.json(
      { error: "Poll ID is required" },
      {
        status: 400,
      }
    );
  }
  if (!contestantId) {
    return NextResponse.json(
      { error: "Contestant ID is required" },
      {
        status: 400,
      }
    );
  }
  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required to vote" },
      {
        status: 400,
      }
    );
  }

  try {
    // success
    return NextResponse.json(
      { message: "VOTE a candidate for a position in this poll" },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error was encountered while voting" },
      { status: 400 }
    );
  }
}
