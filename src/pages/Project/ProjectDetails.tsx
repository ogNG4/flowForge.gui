import { Button, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Column from './components/Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { useModal, useProjectBoardQuery } from '@/hooks';
import TaskDialog from './components/TaskDialog';

export default function ProjectDetails() {
    const { id } = useParams();
    const { data: projectBoard } = useProjectBoardQuery({ projectId: id as string });
    console.log({ projectBoard });
    const columns = projectBoard?.columns;
    const [columnsList, setColumnsList] = useState(columns);
    const { open: openTaskDialog, handleOpen: handleOpenTaskDialog, handleClose: onCloseTaskDialog } = useModal();

    // const handleDragEnd = (event: DragEndEvent) => {
    //     const { active, over } = event;

    //     if (!over) return;

    //     const activeTask = active.id;
    //     const targetColumnId = over.id;

    //     // Znajdź kolumnę i task, który jest przenoszony
    //     const sourceColumn = columnsList.find((col) => col.tasks.some((task) => task.id === activeTask));
    //     const taskToMove = sourceColumn?.tasks.find((task) => task.id === activeTask);

    //     if (!sourceColumn || !taskToMove) return;

    //     // Usuń task ze starej kolumny i dodaj do nowej
    //     setColumnsList((columns) =>
    //         columns.map((col) => {
    //             if (col.id === sourceColumn.id) {
    //                 return {
    //                     ...col,
    //                     tasks: col.tasks.filter((task) => task.id !== activeTask),
    //                 };
    //             }
    //             if (col.id === targetColumnId) {
    //                 return {
    //                     ...col,
    //                     tasks: [...col.tasks, taskToMove],
    //                 };
    //             }
    //             return col;
    //         })
    //     );
    // };

    return (
        <>
            {openTaskDialog && (
                <TaskDialog onClose={onCloseTaskDialog} open={openTaskDialog} projectId={id as string} />
            )}
            <Stack className="gap-2 h-screen">
                <Button onClick={handleOpenTaskDialog}>Dodaj task</Button>
                <Typography>Projekt test</Typography>
                <DndContext>
                    <Stack direction="row" className="gap-2 flex-1">
                        {columns?.map((column) => (
                            <Column key={column.id} id={column.id} name={column.name} tasks={column.tasks} />
                        ))}
                    </Stack>
                </DndContext>
            </Stack>
        </>
    );
}
