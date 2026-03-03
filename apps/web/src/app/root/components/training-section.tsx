"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trainingTypes } from "../data/training";

export default function TrainingSection() {
	return (
		<section id="training" className="bg-white py-20">
			<div className="container mx-auto px-4">
				<h2 className="mb-2 text-center font-bold text-3xl uppercase md:text-4xl">
					Training
				</h2>
				<p className="mb-10 text-center text-muted-foreground italic">
					Unser Training, abgestimmt auf dich
				</p>

				<Tabs defaultValue="jugend" className="w-full">
					<TabsList className="mb-6 grid w-full grid-cols-3">
						{trainingTypes.map((type) => (
							<TabsTrigger key={type.id} value={type.id}>
								{type.title}
							</TabsTrigger>
						))}
					</TabsList>

					{trainingTypes.map((type) => (
						<TabsContent key={type.id} value={type.id}>
							<p className="mb-6 text-muted-foreground">{type.description}</p>
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>
												Tag{" "}
												<small className="text-muted-foreground">
													/ Uhrzeit
												</small>
											</TableHead>
											<TableHead>wer/was</TableHead>
											<TableHead>Trainer</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{type.schedules.map((schedule) => (
											<TableRow
												key={`${schedule.day}-${schedule.time}-${schedule.description}`}
											>
												<TableCell>
													{schedule.day}
													<br />
													<small className="text-muted-foreground">
														{schedule.time}
													</small>
												</TableCell>
												<TableCell>{schedule.description}</TableCell>
												<TableCell>{schedule.trainer}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
