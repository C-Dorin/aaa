'use client';

import React, { useState } from 'react';

export function TaskFunctions() {
	const [taskName, setTaskName] = useState<string>('');
	const [taskUndoneList, setTaskUndoneList] = useState<string[]>([]);
	const [taskDoneList, setTaskDoneList] = useState<string[]>([]);

	//
	// ===== Add Task to Undone List ===== //
	//
	function addTask() {
		if (taskName !== '') {
			setTaskUndoneList([...taskUndoneList, taskName]);
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
		setTaskDoneList((prevTaskDoneList) => [...prevTaskDoneList, taskUndoneList[index]]);
		setTaskUndoneList((prevTaskUndoneList) => {
			const newTaskUndoneList = [...prevTaskUndoneList];
			newTaskUndoneList.splice(index, 1);
			return newTaskUndoneList;
		});
	}

	// From Done to Undone List
	function undoneTask(index: number) {
		setTaskUndoneList((prevTaskUndoneList) => [...prevTaskUndoneList, taskDoneList[index]]);
		setTaskDoneList((prevTaskDoneList) => {
			const newTaskDoneList = [...prevTaskDoneList];
			newTaskDoneList.splice(index, 1);
			return newTaskDoneList;
		});
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
