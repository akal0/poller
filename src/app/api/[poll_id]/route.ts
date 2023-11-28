import { PARTYKIT_URL } from "@/app/env"
import { NextResponse } from "next/server"

export async function GET(
	req: Request,
	{ params }: { params: { poll_id: string } }
) {
	let { poll_id: pollId } = params

	try {
		const res = await fetch(`${PARTYKIT_URL}/party/${pollId}`, {
			method: "GET",
			next: {
				revalidate: 0,
			},
		})

		const data = await res.json()

		return Response.json(data, { status: 200 })
	} catch (err) {
		return new Response("500")
	}
}
