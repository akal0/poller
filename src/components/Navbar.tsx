import { Github } from "lucide-react"
import Link from "next/link"

const Navbar = () => {
	return (
		<div className="fixed flex w-full py-4 px-12 border-b border-slate-900 backdrop-blur-xl z-20">
			<div className="flex items-center justify-between w-full max-w-7xl mx-auto">
				{/* Logo */}
				<Link href="/" className="text-lg font-semibold">
					<span className="text-purple-500">pol</span>ler
				</Link>

				<div>
					<Link
						href="https://github.com/akal0/poller"
						className="opacity-60 hover:opacity-100 transition-opacity duration-400 flex items-center text-xs border px-4 md:px-6 py-1.5 rounded-full"
					>
						Star on Github
						<Github className="h-4 w-4 md:h-[18px] md:w-[18px] ml-2" />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Navbar
