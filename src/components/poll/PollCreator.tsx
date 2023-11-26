"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Trash2Icon } from "lucide-react"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const pollSchema = z.object({
	title: z.string().min(3, {
		message: "The title of your poll must be at least 3 characters!",
	}),
	choices: z
		.array(
			z.string().min(1, {
				message: "An option has to be at least 1 character!",
			})
		)
		.min(2, { message: "You need to have at least 2 options!" }),
})

export type TPollSchema = z.infer<typeof pollSchema>

interface PollCreatorProps {
	createPoll: (values: TPollSchema) => void
}

const PollCreator = ({ createPoll }: PollCreatorProps) => {
	const form = useForm<TPollSchema>({
		resolver: zodResolver(pollSchema),
		defaultValues: {
			title: "Who's paying for dinner tonight?",
			choices: ["Julio"],
		},
	})

	const onSubmit = async (values: TPollSchema) => {
		createPoll(values)
	}

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		// @ts-expect-error
		name: "choices",
		rules: {
			required: true,
		},
	})

	const handleRemove = (index: number) => {
		remove(index)
	}

	const handleAppend = () => {
		append("")
	}

	return (
		<div className="flex flex-col gap-6 items-center">
			<h1 className="text-2xl md:text-4xl text-center font-semibold">
				Create your own poll in{" "}
				<span className="text-purple-600">seconds</span>!
			</h1>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 bg-slate-800/10 rounded-lg py-10 px-8 border border-slate-900 w-[50rem]"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="capitalize">
									{field.name}
								</FormLabel>
								<FormControl>
									<Input
										className="border-slate-800 placeholder:text-slate-400 py-6 px-4"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{fields.map(({ id }, index) => (
						<FormField
							key={id}
							name={`choices.${index}`}
							render={({ field }) => (
								<div className="flex">
									<FormItem className="w-full">
										<FormLabel>
											{`Choice: ${index + 1}`}
										</FormLabel>

										<div className="flex items-end space-x-2 w-full">
											<FormControl>
												<Input
													className="border-slate-800 placeholder:text-slate-400 py-6 px-4"
													{...field}
												/>
											</FormControl>

											<Button
												type="button"
												onClick={() =>
													handleRemove(index)
												}
												variant="outline"
												className=" border-slate-800 text-white group py-6 hover:bg-slate-900 transition-colors duration-300"
											>
												<div>
													<Trash2Icon className="h-4 w-4 text-white opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
												</div>
											</Button>
										</div>
										<FormMessage className="text-xs" />
									</FormItem>
								</div>
							)}
						/>
					))}

					<div className="flex justify-end ml-auto space-x-4">
						<Button
							type="button"
							onClick={handleAppend}
							variant="outline"
							className=" border-slate-800 text-white hover:text-white group py-4 hover:bg-slate-900 transition-colors duration-300"
						>
							Add another choice
						</Button>

						<Button
							type="submit"
							className="bg-slate-900 hover:bg-slate-900/50 border border-slate-800 px-[0.9rem] transition-colors duration-300"
						>
							Create
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default PollCreator
