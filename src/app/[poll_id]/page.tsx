"use client"

import { PARTYKIT_URL } from "../env"
import type { Poll } from "@/types/Poll"
import Votes from "@/components/poll/Votes"
import { useQuery } from "react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export const revalidate = 0

const PollPage = ({ params }: { params: { poll_id: string } }) => {
	const pollId = params.poll_id

	const getPolls = async () => {
		try {
			const response = await axios.get(`/api/${pollId}`)

			return response.data
		} catch (err) {
			console.log(err)
		}
	}

	// Feed the data into poll var

	const { data: poll, isLoading } = useQuery({
		queryKey: "polls",
		queryFn: getPolls,
	})

	return (
		<div className="flex flex-col items-center justify-center space-y-6 min-w-[50%] mx-auto min-h-[calc(100vh-16rem)] md:min-h-[calc(100vh-8rem)] px-8">
			{poll && (
				<h1 className="text-xl md:text-3xl font-semibold text-center">
					{poll.title}
				</h1>
			)}

			{isLoading && (
				<Loader2 className="w-12 h-12 animate-spin flex items-center justify-center" />
			)}

			{poll && (
				<Votes
					id={pollId}
					options={poll.options}
					initialVotes={poll.votes}
				/>
			)}
		</div>
	)
}

export default PollPage
