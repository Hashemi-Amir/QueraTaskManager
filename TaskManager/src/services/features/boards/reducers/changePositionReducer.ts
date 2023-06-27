import { AnyAction } from "@reduxjs/toolkit";
import { initialStateType } from "../boardSlice";

const changePositionReducer = (state: initialStateType, action: AnyAction) => {
  const { source, destination, type } = action.payload;
  // Get the IDs of the columns where the dragged item came from and where it is going to.
  const start = source.droppableId;
  const finish = destination.droppableId;

  // Find the currently active project based on selectedProjectId in the global state. If it doesn't exist, return early.
  const activeProject = state.projects.find(
    ({ projectId }) => projectId === state.selectedProjectId
  );
  if (!activeProject) return;

  // Get all the boards for the active project, sorted in descending order of their position values.
  const allBoards = [...activeProject.projectBoards].sort(
    (b, a) => a.position - b.position
  );

  // If the dragged item is a column, update the position of the affected board(s) within allBoards.
  if (type === "column") {
    const [reorderedBoard] = allBoards.splice(source.index, 1);
    allBoards.splice(destination.index, 0, reorderedBoard);
    activeProject.projectBoards = allBoards
      .map((board, index) => ({
        ...board,
        position: allBoards.length - index,
      }))
      .sort((b, a) => a.position - b.position);
  }

  // Find the active board where the item was dragged from. If it doesn't exist, return early.
  const activeBoard = activeProject.projectBoards.find(
    ({ _id }) => _id === source.droppableId
  );
  if (!activeBoard) return;

  // Get all the tasks for the active board, and remove the dragged item from its previous position.
  const activeBoardTasks = [...activeBoard.tasks];
  const [reorderedItem] = activeBoardTasks.splice(source.index, 1);

  // If the item was dropped in a different column, add it to the destination column's list of tasks and update the positions of all its tasks as necessary.

  if (start !== finish && type === "task") {
    const targetBoard = activeProject.projectBoards.find(
      ({ _id }) => _id === destination.droppableId
    );
    reorderedItem.board = destination.droppableId;
    if (!targetBoard) return;

    targetBoard.tasks.splice(destination.index, 0, reorderedItem);
    const updatedTargetBoardTasks = targetBoard.tasks.map((task, index) => ({
      ...task,
      position: index + 1,
    }));
    targetBoard.tasks = updatedTargetBoardTasks;
  }

  // If the item was dropped in the same column, insert it back into the array of tasks at its new position.
  if (start === finish) {
    activeBoardTasks.splice(destination.index, 0, reorderedItem);
  }

  // Update the positions of all tasks for the active board.
  const updatedActiveBoardTasks = activeBoardTasks.map((task, index) => ({
    ...task,
    position: index + 1,
  }));
  activeBoard.tasks = updatedActiveBoardTasks;
};

export default changePositionReducer;
