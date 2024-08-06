'use client';

import React, { useState } from 'react';
import { DndContext, MouseSensor, KeyboardSensor } from '@dnd-kit/core';
import { closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Check } from 'lucide-react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Dnd() {
	const [taskUndoneList, setTaskUndoneList] = useState<[number, string][]>([
		[1, 'Item 1'],
		[2, 'Item 2'],
		[3, 'Item 3'],
		[4, 'Item 4']
	]);

	function DraggableItem({ id, text }: { id: number; text: string }) {
		const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

		const style = {
			transform: CSS.Transform.toString(transform),
			transition
		};

		return (
			<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
				<Card className="min-w-92 px-2">
					<div className="flex justify-between">
						<div className="pt-0.5">{text}</div>
						<div className="flex space-x-1">
							<Button className="bg-slate-700 border h-8 px-1 border-gray-500">
								<Check className="text-green-600" size={24} />
							</Button>
							<Button className="bg-slate-700 border h-8 px-1 border-gray-500">
								<X className="text-red-600" size={24} />
							</Button>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	function DragAndDropList({
		items,
		setItems
	}: {
		items: [number, string][];
		setItems: React.Dispatch<React.SetStateAction<[number, string][]>>;
	}) {
		const sensors = useSensors(
			useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
			useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
		);

		const handleDragEnd = (event: any) => {
			const { active, over } = event;

			if (active.id !== over?.id) {
				setItems((items) => {
					const oldIndex = items.findIndex((item) => item[0] === active.id);
					const newIndex = items.findIndex((item) => item[0] === over.id);

					return arrayMove(items, oldIndex, newIndex);
				});
			}
		};

		return (
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext
					items={items.map((item) => item[0])}
					strategy={verticalListSortingStrategy}
				>
					{items.map((item) => (
						<DraggableItem key={item[0]} id={item[0]} text={item[1]} />
					))}
				</SortableContext>
			</DndContext>
		);
	}

	return (
		<div className="felx-col space-y-1 p-1">
			<DragAndDropList items={taskUndoneList} setItems={setTaskUndoneList} />
		</div>
	);
}
