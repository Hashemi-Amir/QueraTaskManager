import Collapsible from "../components/dashboard/dashboardListView/Collapsible";

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

  return <Collapsible projects={projects} />;
};

export default ListView;
