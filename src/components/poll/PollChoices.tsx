"use client"

import { cn } from "@/lib/utils"
import { Poll } from "@/types/Poll"

interface PollChoicesProps {
	poll: Poll
	vote: number | null
	setVote: (option: number) => void
}

const PollChoices = ({ poll, vote, setVote }: PollChoicesProps) => {
	// @ts-ignore
	const totalVotes = poll.votes.reduce((a, b) => a + b, 0)
	// @ts-ignore
	const mostVotes = Math.max(...poll.votes)
	// @ts-ignore
	const leastVotes = Math.min(...poll.votes)
	return (
		<ul className="flex h-full flex-col space-y-4">
			{poll.options?.map((option, i) => (
				<li key={i}>
					<div className="relative w-full min-h-[40px] border rounded-md border-slate-800 flex">
						<div
							className={cn(
								"absolute top-0 left-0 bottom-0 w-full rounded-md transition-all duration-500 z-10",
								// @ts-ignore
								poll.votes[i] === mostVotes
									? "bg-green-600"
									: vote === i
									? "bg-purple-600"
									: "bg-blue-600",
								// @ts-ignore
								poll.votes[i] === leastVotes && "bg-red-600"
							)}
							style={{
								width:
									vote === null
										? 0
										: `${
												// @ts-ignore
												((poll?.votes[i] ?? 0) /
													totalVotes) *
												100
										  }%`,
							}}
						/>

						<div className="select-none w-full flex items-center justify-between px-4 py-2 z-20">
							<button
								onClick={() => setVote(i)}
								className={cn(
									"flex-shrink flex text-left w-full",
									vote === null
										? "cursor-pointer"
										: "cursor-default",
									vote === null
										? ""
										: // @ts-ignore
										poll.votes[i] === mostVotes
										? "font-extrabold"
										: "font-semibold"
								)}
							>
								<span className="flex items-center gap-x-2">
									{vote === i && (
										<span className="text-xl relative top-[2px]">
											🎈
										</span>
									)}
									{option}
								</span>
							</button>
							{vote === null ? null : vote === i ? (
								<span className="text-white font-bold">
									{/* @ts-ignore */}
									{poll.votes[i] ?? 0}
								</span>
							) : (
								<span className="text-white">
									{/* @ts-ignore */}
									{poll.votes[i] ?? 0}
								</span>
							)}
						</div>
					</div>
				</li>
			))}
		</ul>
	)
}

export default PollChoices
