"use client"

import { PARTYKIT_HOST } from "@/app/env"
import { Poll } from "@/types/Poll"
import usePartySocket from "partysocket/react"
import { useEffect, useState } from "react"
import PollChoices from "./PollChoices"

const Votes = ({ poll, id }: { poll: Poll; id: string }) => {
	// Overall votes for the poll
	const [votes, setVotes] = useState<number[]>(poll.votes ?? [])

	// User's individual vote
	const [vote, setVote] = useState<number | null>(null)

	// usePartySocketHook which lets you send info to PartyKit server on votes

	const socket = usePartySocket({
		host: PARTYKIT_HOST,
		room: id,
		onMessage(event) {
			const message = JSON.parse(event.data) as Poll
			if (message.votes) {
				setVotes(message.votes)
			}
		},
	})

	const sendVote = (option: number) => {
		if (vote === null) {
			// Send message using WebSockets
			socket.send(JSON.stringify({ type: "vote", option }))

			setVote(option)
		}
	}

	// Prevent double voting by saving user's vote in localStorage && PartyKit's local storage

	useEffect(() => {
		// Check if they have a saved vote with corresponding ID
		let saved = localStorage?.getItem("Poll:" + id)

		// If their vote is NULL but they have a saved vote, set the vote as the saved vote
		if (vote === null && saved !== null) {
			setVote(+saved)
		} else if (vote !== null && saved === null) {
			// If they haven't voted yet AND don't have a saved vote, set a new vote for them in localStorage
			localStorage?.setItem("Poll:" + id, `${vote}`)
		}
	}, [id, vote])

	return <PollChoices vote={vote} poll={poll} setVote={sendVote} />
}

export default Votes
