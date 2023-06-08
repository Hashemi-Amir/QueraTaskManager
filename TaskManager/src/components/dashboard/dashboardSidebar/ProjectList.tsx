import { BsThreeDots } from "react-icons/bs";

type Projects = {
  projects: [];
};

function ProjectList({ projects }: Projects) {
  return (
    <>
      {projects.map(({ _id, name }) => (
        <div
          className="pb-3 font-medium flex justify-between items-center cursor-pointer group/content"
          key={_id}
        >
          {name}
          <span className="cursor-pointer hidden group-hover/content:block z-10">
            <BsThreeDots />
          </span>
        </div>
      ))}
    </>
  );
}

export default ProjectList;