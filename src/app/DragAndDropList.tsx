import { DndContext, MouseSensor, KeyboardSensor } from '@dnd-kit/core';
import { closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import { Undo2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { TaskFunctions } from './taskFunctions';

function DraggableItem({
	array,
	id,
	text
}: {
	array: [number, string][];
	id: number;
	text: string;
}) {
	const { taskUndoneList, deleteUndoneTask, deleteDoneTask, doneTask, undoneTask } =
		TaskFunctions();

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	const undoneListLayout = (
		<>
			<Button className="bg-slate-700 border h-8 px-1 border-gray-500" onClick={() => doneTask(id)}>
				<Check className="text-green-600" size={24} />
			</Button>
			<Button
				className="bg-slate-700 border h-8 px-1 border-gray-500"
				onClick={() => deleteUndoneTask(id)}
			>
				<X className="text-red-600" size={24} />
			</Button>
		</>
	);

	const doneListLayout = (
		<>
			<Button
				className="bg-slate-700 border h-8 px-1 border-gray-500"
				onClick={() => undoneTask(id)}
			>
				<Undo2 className="text-orange-400" size={24} />
			</Button>
			<Button
				className="bg-slate-700 border h-8 px-1 border-gray-500"
				onClick={() => deleteDoneTask(id)}
			>
				<X className="text-red-600" size={24} />
			</Button>
		</>
	);

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Card className="min-w-92 px-2">
				<div className="flex justify-between">
					<div className="pt-0.5">{text}</div>
					<div className="flex space-x-1">
						{taskUndoneList != array ? undoneListLayout : doneListLayout}
					</div>
				</div>
			</Card>
		</div>
	);
}

export default function DragAndDropList({
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
			<SortableContext items={items.map((item) => item[0])} strategy={verticalListSortingStrategy}>
				{items.map((item) => (
					<DraggableItem key={item[0]} array={items} id={item[0]} text={item[1]} />
				))}
			</SortableContext>
		</DndContext>
	);
}
