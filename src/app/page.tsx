'use client';

import React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import { Undo2 } from 'lucide-react';

import { TaskFunctions } from './taskFunctions';

export default function Home() {
	const {
		taskName,
		setTaskName,
		taskUndoneList,
		taskDoneList,
		addTask,
		handleKeyDown,
		deleteUndoneTask,
		deleteDoneTask,
		doneTask,
		undoneTask
	} = TaskFunctions();

	return (
		<div>
			<div className="flex justify-center pt-20">
				<Input
					className="border-slate-700"
					placeholder="Write here ..."
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div className="flex justify-center pt-10">
				<Button className="w-36 hover:bg-orange-700" onClick={addTask}>
					Add
				</Button>
			</div>
			<div className="flex justify-center pt-20">
				<div className="flex-col justify-center">
					<div className="flex justify-center space-x-10 px-5 max-w-250 min-w-213">
						<div className="flex justify-center w-96">
							<p className="text-2xl text-slate-200 font-semibold title">To do</p>
						</div>
						<div className="flex justify-center w-96">
							<p className="text-2xl text-slate-200 font-semibold title">Done</p>
						</div>
					</div>
					<div className="flex justify-center space-x-10 px-5 max-w-250 min-w-213">
						<div className="h-100 w-96 rounded-md bg-gray-800 border border-gray-600">
							<div className="felx-col space-y-1 p-1">
								{taskUndoneList.length === 0 ? (
									<div className="content-center h-96">
										<div className="flex justify-center">
											<p className="p-1 px-2 text-slate-500 text-4xl">No data</p>
										</div>
									</div>
								) : (
									taskUndoneList.map((text, index) => (
										<Card key={index} className="min-w-92 px-2">
											<div className="flex justify-between">
												<div className="pt-0.5">{text}</div>
												<div className="flex space-x-1">
													<Button
														className="bg-slate-700 border h-8 px-1 border-gray-500"
														onClick={() => doneTask(index)}
													>
														<Check className="text-green-600" size={24} />
													</Button>
													<Button
														className="bg-slate-700 border h-8 px-1 border-gray-500"
														onClick={() => deleteUndoneTask(index)}
													>
														<X className="text-red-600" size={24} />
													</Button>
												</div>
											</div>
										</Card>
									))
								)}
							</div>
						</div>
						<div className="h-100 w-96 rounded-md bg-gray-800 border border-gray-600">
							<div className="felx-col space-y-1 p-1">
								{taskDoneList.length === 0 ? (
									<div className="content-center h-96">
										<div className="flex justify-center">
											<p className="p-1 px-2 text-slate-500 text-4xl">No data</p>
										</div>
									</div>
								) : (
									taskDoneList.map((text, index) => (
										<Card key={index} className="min-w-92 px-2">
											<div className="flex justify-between">
												<div className="pt-0.5">{text}</div>
												<div className="flex space-x-1">
													<Button
														className="bg-slate-700 border h-8 px-1 border-gray-500"
														onClick={() => undoneTask(index)}
													>
														<Undo2 className="text-orange-500" size={24} />
													</Button>
													<Button
														className="bg-slate-700 border h-8 px-1 border-gray-500"
														onClick={() => deleteDoneTask(index)}
													>
														<X className="text-red-600" size={24} />
													</Button>
												</div>
											</div>
										</Card>
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
