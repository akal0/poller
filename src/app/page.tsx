import Navbar from "@/components/Navbar"
import Hero from "@/components/landing/Hero"
import PollCreator, { TPollSchema } from "@/components/poll/PollCreator"
import { redirect } from "next/navigation"
import { PARTYKIT_URL } from "./env"
import { Poll } from "@/types/Poll"
import Footer from "@/components/landing/Footer"

const randomId = () => Math.random().toString(36).substring(2, 10)

export default function Home() {
	const createPoll = async (values: TPollSchema) => {
		"use server"

		const { title, choices } = values

		const id = randomId()

		const poll: Poll = {
			title,
			options: choices,
		}

		// Send POST request to PartyKit room

		await fetch(`${PARTYKIT_URL}/party/${id}`, {
			method: "POST",
			body: JSON.stringify(poll),
			headers: {
				"Content-Type": "application/json",
			},
		})

		redirect(`${id}`)
	}

	return (
		<main className="relative flex flex-col items-center min-h-screen text-white scroll-smooth">
			<div className="flex flex-col gap-4 ">
				<Hero />
				<PollCreator createPoll={createPoll} />
			</div>
		</main>
	)
}
