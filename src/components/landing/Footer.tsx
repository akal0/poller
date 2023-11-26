import Link from "next/link"

const Footer = () => {
	return (
		<div className="border-t border-slate-900 py-12">
			<div className="flex items-center justify-between max-w-7xl mx-auto">
				<h1>
					<Link href="/" className="text-xl font-semibold">
						<span className="text-purple-500">pol</span>ler
					</Link>
				</h1>

				<p className="text-sm ">
					Made with <span className="text-purple-500"> ❤︎ </span> by
					Abdallah Kalenga.
				</p>
			</div>
		</div>
	)
}

export default Footer
