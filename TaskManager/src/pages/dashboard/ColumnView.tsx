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

// const initialTasks: Task[] = [
//   {
//     _id: "646f432f6b7c80ef1bf73cb1",
//     name: "task name 1",
//     description: "description description description",
//     label: [],
//     board: "646d2feb42ac0dafec913394",
//     taskTags: [],
//     taskAssigns: ["6470d4dc7eda5c57d3bcc3ca"],
//     comments: [
//       "6470e3f489d52e9c5a4918d5",
//       "6470e3f589d52e9c5a4918d9",
//       "6470e3f589d52e9c5a4918dd",
//     ],
//     position: 1,
//   },
//   {
//     _id: "646f43326b7c80ef1bf73cb7",
//     name: "task name 2",
//     description: "description description description",
//     label: [],
//     board: "646d2feb42ac0dafec913394",
//     taskTags: [],
//     taskAssigns: [],
//     comments: [],
//     position: 2,
//   },
//   {
//     _id: "646f43356b7c80ef1bf73cbe",
//     name: "new name",
//     description: "new description",
//     label: [],
//     board: "646d2feb42ac0dafec913394",
//     taskTags: [],
//     taskAssigns: [],
//     comments: [],
//     position: 3,
//     deadline: "2023-05-16T12:52:24.483Z",
//   },
//   {
//     _id: "646f43386b7c80ef1bf73cc6",
//     name: "task name 4",
//     description: "description description description",
//     label: [],
//     board: "646d2feb42ac0dafec913394",
//     taskTags: [],
//     taskAssigns: [],
//     comments: [],
//     position: 4,
//   },
//   {
//     _id: "646f433e6b7c80ef1bf73ccf",
//     name: "task name 5",
//     description: "description description description",
//     label: [],
//     board: "646d2feb42ac0dafec913394",
//     taskTags: [],
//     taskAssigns: [],
//     comments: [],
//     position: 5,
//   },
//   {
//     _id: "646f43416b7c80ef1bf73cd9",
//     name: "task name 6",
//     description: "description description description",
//     label: [],
//     board: "646d2feb42ac0dafec913394",
//     taskTags: [],
//     taskAssigns: [],
//     comments: [],
//     position: 6,
//   },
//   {
//     _id: "646f43456b7c80ef1bf73ce4",
//     name: "task name 7",
//     description: "description description description",
//     label: [],
//     board: "646d2feb42ac0dafec913394",
//     taskTags: [],
//     taskAssigns: [],
//     comments: [],
//     position: 7,
//   },
// ];

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
