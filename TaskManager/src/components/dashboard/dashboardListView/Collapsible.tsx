import { useState } from "react";
import { TfiArrowCircleDown } from "react-icons/tfi";

type CollapsibleProps = {
  title: string;
  titleClass: string;
  numberTask?: number;
  chevronClass: string;
  children: React.ReactNode;
  id?: string | undefined;
  onClick?: () => void;
};
const Collapsible = ({
  title,
  children,
  chevronClass,
  titleClass,
  numberTask,
}: CollapsibleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const transition = "transition-all delay-75 ease-in-out";

  return (
    <div className="mt-8">
      <div
        className="flex items-center gap-2 w-fit cursor-pointer"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <span className={chevronClass}>
          {isExpanded ? (
            <TfiArrowCircleDown className={transition} />
          ) : (
            <TfiArrowCircleDown className={`rotate-180 ${transition}`} />
          )}
        </span>
        <h3 className={titleClass}>{title}</h3>
        <div className="text-sm font-normal flex items-center justify-between">
          <div>{numberTask && numberTask + " تسک"}</div>
        </div>
      </div>
      {isExpanded && <div className="flex flex-col">{children}</div>}
    </div>
  );
};

export default Collapsible;
