import { BsThreeDots } from "react-icons/bs";

type Space = {
  space: {
    spaceName: string;
    projectName?: string[] | undefined;
    spaceColor: string;
  };
};

function ProjectList({ space }: Space) {
  return (
    <>
      {space.projectName && (
        <div className="collapse-content ">
          {space.projectName.map((project: any) => (
            <div
              className="pb-3 font-medium flex justify-between items-center group/content"
              key={project}
            >
              {project}
              <span className="cursor-pointer hidden group-hover/content:block z-10">
                <BsThreeDots />
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProjectList;
