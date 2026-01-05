"use server";
import { BASE_URL } from "@/libs/config/configuration";
import { cookies } from "next/headers";

export default async function getUserInformation(pollId) {
  try {
    const request = await fetch(`${BASE_URL}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
    });
    const response = await request.json();
    if (!request?.ok || response?.error) return null;
    const {
      user: { voteInformation, _id, name, email },
    } = response;
    const findPoll = voteInformation.find((vote) => vote.pollId === pollId);
    if (!findPoll) return null;
    return { poll: findPoll, userId: _id, name, email };
  } catch (err) {
    return null;
  }
}
