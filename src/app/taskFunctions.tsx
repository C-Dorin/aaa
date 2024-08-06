'use client';

import React, { useState } from 'react';

export function TaskFunctions() {
	const [taskName, setTaskName] = useState<string>('');
	const [taskUndoneList, setTaskUndoneList] = useState<[number, string][]>([]);
	const [taskDoneList, setTaskDoneList] = useState<[number, string][]>([]);

	//
	// ===== Add Task to Undone List ===== //
	//
	function addTask() {
		if (taskName !== '') {
			setTaskUndoneList([...taskUndoneList, [taskUndoneList.length, taskName]]);
		}
		setTaskName('');
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addTask();
		}
	};

	//
	// ===== Delete Task ===== //
	//
	// From Undone List
	function deleteUndoneTask(index: number) {
		setTaskUndoneList((prevTaskUndoneList) => {
			const newTaskUndoneList = [...prevTaskUndoneList];
			newTaskUndoneList.splice(index, 1);
			return newTaskUndoneList;
		});
	}

	// From Done List
	function deleteDoneTask(index: number) {
		setTaskDoneList((prevTaskDoneList) => {
			const newTaskDoneList = [...prevTaskDoneList];
			newTaskDoneList.splice(index, 1);
			return newTaskDoneList;
		});
	}

	//
	// ===== Transfer Task ===== //
	//
	// From Undone to Done List
	function doneTask(index: number) {
		if (index < 0 || index >= taskUndoneList.length) return;

		const newItem = taskUndoneList[index];
		if (newItem) {
			newItem[0] = taskDoneList.length | 0;

			setTaskDoneList((prevTaskDoneList) => [...prevTaskDoneList, newItem]);
			setTaskUndoneList((prevTaskUndoneList) => {
				const newTaskUndoneList = [...prevTaskUndoneList];
				newTaskUndoneList.splice(index, 1);
				return newTaskUndoneList;
			});
		}
	}

	// From Done to Undone List
	function undoneTask(index: number) {
		if (index < 0 || index >= taskDoneList.length) return;

		const newItem = taskDoneList[index];
		if (newItem) {
			newItem[0] = taskUndoneList.length | 0;

			setTaskUndoneList((prevTaskUndoneList) => [...prevTaskUndoneList, newItem]);
			setTaskDoneList((prevTaskDoneList) => {
				const newTaskDoneList = [...prevTaskDoneList];
				newTaskDoneList.splice(index, 1);
				return newTaskDoneList;
			});
		}
	}

	return {
		taskName,
		setTaskName,
		taskUndoneList,
		setTaskUndoneList,
		taskDoneList,
		setTaskDoneList,
		addTask,
		handleKeyDown,
		deleteUndoneTask,
		deleteDoneTask,
		doneTask,
		undoneTask
	};
}
