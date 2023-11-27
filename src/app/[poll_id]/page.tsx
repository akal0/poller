import { PARTYKIT_URL } from "../env"
import type { Poll } from "@/types/Poll"
import Votes from "@/components/poll/Votes"
import { useState } from "react"

const PollPage = async ({ params }: { params: { poll_id: string } }) => {
	const pollId = params.poll_id

	// Send a GET request to PartyKit room

	const getPoll = async () => {
		"use server"

		try {
			const req = await fetch(`${PARTYKIT_URL}/party/${pollId}`, {
				method: "GET",
				next: {
					revalidate: 0,
				},
			})

			const poll = (await req.json()) as Poll

			return poll
		} catch (err) {
			console.log(err)
		}
	}

	const poll = await getPoll()

	// Feed the data into poll var

	return (
		<div className="flex flex-col justify-center space-y-6 min-w-[50%] mx-auto min-h-[calc(100vh-16rem)] md:min-h-[calc(100vh-8rem)] px-8">
			<h1 className="text-xl md:text-3xl font-semibold text-center">
				{poll?.title}
			</h1>

			<Votes
				id={pollId}
				options={poll?.options}
				initialVotes={poll?.votes}
			/>
		</div>
	)
}

export default PollPage
