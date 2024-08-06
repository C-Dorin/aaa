'use client';

import React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { TaskFunctions } from './taskFunctions';
import DragAndDropList from './DragAndDropList';

export default function Home() {
	const {
		taskName,
		setTaskName,
		taskUndoneList,
		setTaskUndoneList,
		taskDoneList,
		setTaskDoneList,
		addTask,
		handleKeyDown
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
									<DragAndDropList items={taskUndoneList} setItems={setTaskUndoneList} />
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
									<DragAndDropList items={taskDoneList} setItems={setTaskDoneList} />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
