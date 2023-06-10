import Board from "../../components/dashboard/dashboardColumnView/Board";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppSelector } from "../../services/app/hook";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import { useEffect, useState } from "react";
// import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
// import {
//   KeyboardSensor,
//   MouseSensor,
//   TouchSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { toast } from "react-toastify";
// import { resetWorkspace } from "../../services/app/store";

const ColumnView = () => {
  const { isError, message, isLoading, isSuccess, boards } = useAppSelector(
    (state) => state.boards
  );
  const borderColors = JSON.parse(
    localStorage.getItem("BorderColors") as string
  );

  //  dnd-kit Options
  // const [tasks, setTasks] = useState<BoardsProps[]>(boards);
  // const handleDragEnd = (event: any) => {
  //   console.log("Drag end Called");
  //   const { active, over } = event;
  //   // console.log("Active: " + active.id);
  //   // console.log("Over: " + over.id);

  //   if (active.id !== over.id) {
  //     setTasks((items) => {
  //       const oldIndex = tasks.findIndex((task) => task._id === active.id);
  //       const newIndex = tasks.findIndex((task) => task._id === over.id);
  //       // console.log(arrayMove(items, oldIndex, newIndex));

  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  // };
  // const sensors = useSensors(
  //   useSensor(MouseSensor, {
  //     activationConstraint: {
  //       distance: 8,
  //     },
  //   }),
  //   useSensor(TouchSensor, {
  //     activationConstraint: {
  //       delay: 200,
  //       tolerance: 6,
  //     },
  //   }),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );

  return (
    // <DndContext
    //   collisionDetection={closestCenter}
    //   onDragEnd={handleDragEnd}
    //   sensors={sensors}
    // >
    <>
      {!isSuccess && !isError && !isLoading ? (
        <div className="m-auto">پروژه‌ای را جهت نمایش اطلاعات انتخاب کنید 😃</div>
      ) : isLoading ? (
        <AiOutlineLoading3Quarters
          size="2.8rem"
          color="208D8E"
          className="m-auto animate-spin"
        />
      ) : isSuccess && boards.length === 0 ? (
        <div className="m-auto">هیچ اطلاعاتی جهت نمایش وجود ندارد ☹️</div>
      ) : (
        boards.map(({ _id, name, tasks }, index) => {
          return (
            <Board
              key={_id}
              title={name}
              number={tasks.length}
              id={_id}
              tasks={tasks}
              borderColor={borderColors[index]}
            />
          );
        })
      )}
      {isError && <div className="m-auto text-FB0606">{`${message}`}</div>}
    </>
    // </DndContext>
  );
};

export default ColumnView;
