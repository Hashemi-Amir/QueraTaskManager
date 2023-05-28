interface WorkSpaceProps {
  spaceList: { spaceName: string; projectNAme?: string; spaceColor: string }[];
}

const WorkSpaceList = ({ spaceList }: WorkSpaceProps) => {
  // console.log(spaceList);

  return (
    <div className="w-64  my-5 px-1 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full ">
      {spaceList.map((space) => (
        <div className="flex gap-2">
          <div className={`w-5 h-5 bg-${space.spaceColor} rounded`}></div>
          <ul className="text-base font-medium list-inside">
            {space.spaceName}
            <li className="my-6">{space.projectNAme}</li>
            <li className="my-6">{space.projectNAme}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WorkSpaceList;
