import { connectDatabase } from "@/libs/connectdatabase";
import { NextResponse } from "next/server";
import Contestant from "@/libs/models/contestant.models";
import Polls from "@/libs/models/polls.models";
import User from "@/libs/models/user.models";

export async function PUT(req, { params }) {
  const { pollsId, contestantId } = await params;
  const { userId, candidateUserId } = await req.json();
  // if no userId
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized Access" },
      {
        status: 401,
      }
    );
  }
  // if no pollsId
  if (!pollsId) {
    return NextResponse.json(
      { error: "Polls Id is not defined" },
      {
        status: 400,
      }
    );
  }
  // if no contestantId
  if (!contestantId) {
    return NextResponse.json(
      { error: "Polls contestantId is not defined" },
      {
        status: 400,
      }
    );
  }
  // if no candidateUserId
  if (!candidateUserId) {
    return NextResponse.json(
      { error: "Candidate User Id is not defined" },
      {
        status: 401,
      }
    );
  }
  try {
    await connectDatabase();
    // check if the user who wants to vote exist
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        {
          status: 400,
        }
      );
    }
    // check if the candidate the user wants to vote for exist
    const candidate = await User.findById(candidateUserId);
    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate does not exist" },
        {
          status: 400,
        }
      );
    }
    // check if the poll exist
    const poll = await Polls.findById(pollsId);
    if (!poll) {
      return NextResponse.json(
        { error: "Poll does not exist" },
        {
          status: 400,
        }
      );
    }
    // check if the candidate and user belong to the poll
    const userBelongToPoll = poll?.voters?.find((voter) => {
      return voter.toString() === userId.toString();
    });
    if (!userBelongToPoll) {
      return NextResponse.json(
        { error: "User does not belong to this poll" },
        {
          status: 400,
        }
      );
    }
    const candidateBelongToPoll = poll?.voters?.find((voter) => {
      return voter.toString() === candidateUserId.toString();
    });
    if (!candidateBelongToPoll) {
      return NextResponse.json(
        { error: "Candidate does not belong to this poll" },
        {
          status: 400,
        }
      );
    }
    // check if the contestant exist
    const contestant = await Contestant.findById(contestantId);
    if (!contestant) {
      return NextResponse.json(
        { error: "Contestant does not exist" },
        {
          status: 400,
        }
      );
    }
    // check if the user has voted before
    const hasUserVoted = contestant?.voters.find((voter) => {
      return voter.toString() === userId.toString();
    });
    if (hasUserVoted) {
      return NextResponse.json(
        { error: "User has voted for a candidate in this position" },
        {
          status: 400,
        }
      );
    }
    // check if the candidate exist in this contestant
    const candidateExistInContestant = contestant?.candidates?.find(
      (candidate) => {
        return candidate?.userId?.toString() === candidateUserId.toString();
      }
    );
    if (!candidateExistInContestant) {
      return NextResponse.json(
        { error: "Candidate does not belong to this position" },
        {
          status: 400,
        }
      );
    }
    //if user has not voted and candidate exist in contestant
    const voteUpdate = await Contestant.updateOne(
      {
        _id: contestantId,
        voters: { $ne: userId },
        "candidates.userId": candidateUserId,
      },
      {
        $inc: { "candidates.$.votes": 1 },
        $addToSet: { voters: userId },
      }
    );

    if (voteUpdate.modifiedCount === 0) {
      return NextResponse.json(
        {
          error:
            "User has already voted for this position or candidate is invalid",
        },
        { status: 400 }
      );
    }

    // mark user as completed voter (optional, still safe)
    await Polls.updateOne(
      { _id: pollsId },
      { $addToSet: { completedVoters: userId } }
    );

    //success
    return NextResponse.json(
      { message: "Vote recorded successfully" },
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
