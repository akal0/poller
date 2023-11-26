import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Separator } from "../ui/separator"

const Hero = () => {
	return (
		<div className="flex flex-col gap-4 justify-center items-center py-8 min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh)]">
			<div className="flex flex-col items-center gap-4">
				<Badge className="p-2 rounded-full px-8 text-xs bg-purple-600 hover:bg-purple-600/80 duration-300 transition-colors border border-purple-100/30 hover:border-purple-100/20 cursor-default">
					Nov 23: The birth of poller!
				</Badge>

				<h1 className="text-2xl md:text-5xl font-semibold w-3/4 text-center md:leading-tight">
					Providing
					<span className="text-purple-500">
						{" "}
						realtime polls{" "}
					</span>{" "}
					for realtime situations!
				</h1>

				<p className="text-center w-3/4 md:w-3/5 text-sm md:text-md text-slate-400">
					We know how frustrating it is to need a poll that provides
					realtime votes, no matter the situation. With poller, you
					won&apos;t have to worry about this issue again!
				</p>
			</div>

			<div className="flex flex-col gap-8 relative px-4 md:p-0">
				<div className="border border-slate-800 rounded-2xl p-3 bg-slate-900/50 mt-4 relative z-10 backdrop-blur-3xl">
					<Image
						alt="poller diagram"
						width={0}
						height={0}
						src="/diagrams/poller.jpg"
						className="w-full md:h-96 rounded-lg border border-slate-800"
						unoptimized
					/>
				</div>
				<div className="absolute top-4 md:top-0 left-5 md:-left-4 w-24 md:w-72 h-24 md:h-72 bg-green-600 rounded-full blur-2xl -z-1 opacity-70 animate-blob" />
				<div className="absolute top-4 md:top-0 right-5 md:-right-4 w-24 md:w-72 h-24 md:h-72 bg-red-600 rounded-full blur-2xl -z-1 opacity-70 animate-blob" />
				<div className="absolute -bottom-4 md:-bottom-12 left-[38%] w-24 md:w-72 h-24 md:h-72 bg-blue-600 rounded-full blur-2xl -z-1 opacity-70 animate-blob" />
			</div>
		</div>
	)
}

export default Hero
