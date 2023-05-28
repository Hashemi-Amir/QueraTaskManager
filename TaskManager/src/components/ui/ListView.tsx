import Collapsible from "./Collapsible";

const ListView = () => {
  const projects = [
    {
      name: "پروژه اول",
      id: 1,
      pending: [
        {
          id: 10,
          title: "این اولین تسک نمونه است",
          members: ["Amir, Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
        {
          id: 11,
          title: "این دومین تسک نمونه است",
          members: ["Amir,Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
      ],
      inProgress: [
        {
          id: 22,
          title: "این اولین تسک نمونه است",
          members: ["Amir,Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
        {
          id: 23,
          title: "این دومین تسک نمونه است",
          members: ["Amir,Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
      ],
      done: [
        {
          id: 33,
          title: "این اولین تسک نمونه است",
          members: ["Amir,Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
        {
          id: 34,
          title: "این دومین تسک نمونه است",
          members: ["Amir,Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
      ],
    },
    {
      name: "پروژه دوم",
      id: 2,
      pending: [
        {
          id: 13,
          title: "این اولین تسک نمونه است",
          members: ["Amir,Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
        {
          id: 14,
          title: "این دومین تسک نمونه است",
          members: ["Amir,Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
      ],
      inProgress: [
        {
          id: 23,
          title: "این اولین تسک نمونه است",
          members: ["Amir,Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
        {
          id: 24,
          title: "این دومین تسک نمونه است",
          members: ["Amir,Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
      ],
      done: [
        {
          id: 33,
          title: "این اولین تسک نمونه است",
          members: ["Amir,Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
        {
          id: 34,
          title: "این دومین تسک نمونه است",
          members: ["Amir,Saeed"],
          deadLine: "۶ آبان",
          priority: "High",
          description: "این یک توضیحات است",
        },
      ],
    },
  ];
  // console.log(projects[0].pending[0].);

  return <Collapsible projects={projects} />;
};

// <div className="bg-FAFBFC">
//   {projects.map((project) => (
//     <Collapsible title={project.name}>
//       <Collapsible
//         title={
//           <div className="flex justify-between">
//             <div className="w-1/6">Pending</div>
//             {open && <div className="flex justify-between w-4/6">
//               <div>عنوان</div>
//               <div>اعضا</div>
//               <div>ددلاین</div>
//               <div>اولویت</div>
//               <div>توضیحات</div>
//             </div>}
//           </div>
//         }
//       >
//         <ul className="flex justify-between">
//         <div className="w-1/6">
//             <li>{project.tasks.title}</li>
//           </div>
//           <div className="flex justify-between w-4/6">
//             <li>{project.tasks.members}</li>
//             <li>{project.tasks.deadLine}</li>
//             <li>{project.tasks.priority}</li>
//             <li>{project.tasks.description}</li>
//           </div>
//         </ul>
//       </Collapsible>
//     </Collapsible>
//   ))}
// </div>

// <>
//   {projects.map((project) => (
//     <div className="flex items-center mt-8">
//         {isOpen ? <CiCircleChevDown /> : <CiCircleChevUp />}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="mr-4"
//       >
//         {project.name}
//       </button>
//     </div>
//   ))}
// </>

/* <button onClick={() => setIsOpen(!isOpen)} className="flex items-center w-full mt-8">{project.name}</button> */
// <div className="relative">
//   <button
//     onClick={() => setIsOpen(!isOpen)}
//     className=" flex items-center w-full mt-8"
//   >
//     {isOpen ? <CiCircleChevDown /> : <CiCircleChevUp />}
//     {projects.map((project) => (
//       <div className="mr-3 font-bold text-xl">{project.name}</div>
//     ))}
//   </button>
//   {isOpen && (
//     <div className="absolute w-full max-h-32 overflow-auto rounded-md border border-D3D3D3  list-none shadow-lg bg-white scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full">
//       <li className="p-1 text-sm hover:bg-F0F1F3 cursor-pointer ">
//         {projects.map((project) => (
//           <div className="mr-3">{project.tasks.title}</div>
//         ))}
//       </li>
//     </div>
//   )}
// </div>

// <div className="collapse">
//   <input type="checkbox" />
//   <button onClick={() => setIsOpen(!isOpen)}>
//   <div className="flex items-center">
//     {isOpen ? <CiCircleChevDown /> : <CiCircleChevUp />}
//     {projects.map((project) => (
//         <div className="mr-3 font-bold text-xl">{project.name}</div>
//         ))}
//   </div>
//         </button>
//   {isOpen && (
//     <div className="collapse-content">
//       <p>hello</p>
//     </div>
//   )}
// </div>

export default ListView;
