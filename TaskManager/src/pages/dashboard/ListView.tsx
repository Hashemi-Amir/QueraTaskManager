import Collapsible from "../../components/dashboard/dashboardListView/Collapsible";
import CollapseTable from "../../components/dashboard/dashboardListView/CollapseTable";

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

  const titleClass = "px-3 py-1 rounded text-base text-white";
  const chevronClass = "text-lg mr-10";

  return (
    <div className="pb-8">
      {projects.map((project) => (
        <Collapsible
          title={project.name}
          titleClass="font-bold"
          chevronClass={"text-xl mr-1"}
          key={project.id}
        >
          <Collapsible
            title={"Pending"}
            numberTask={project.pending.length}
            titleClass={`bg-F92E8F ${titleClass}`}
            chevronClass={chevronClass}
          >
            <CollapseTable tasks={project.pending} />
          </Collapsible>
          <Collapsible
            title={"inProgress"}
            numberTask={project.inProgress.length}
            titleClass={`bg-F98F2E ${titleClass}`}
            chevronClass={chevronClass}
          >
            <CollapseTable tasks={project.inProgress} />
          </Collapsible>
          <Collapsible
            title={"Done"}
            numberTask={project.done.length}
            titleClass={`bg-43BB0B ${titleClass}`}
            chevronClass={chevronClass}
          >
            <CollapseTable tasks={project.done} />
          </Collapsible>
        </Collapsible>
      ))}
    </div>
  );
};

export default ListView;
