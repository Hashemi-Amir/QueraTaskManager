import React, { useState } from "react";
import { TfiArrowCircleUp, TfiArrowCircleDown } from "react-icons/tfi";
import { CiTextAlignRight } from "react-icons/ci";

type Collapsible = {
  projects: Array<{
    name: string;
    id: number;
    pending: {
      id: number;
      title: string;
      members: string[];
      deadLine: string;
      priority: string;
      description: string;
    }[];
    inProgress: {
      id: number;
      title: string;
      members: string[];
      deadLine: string;
      priority: string;
      description: string;
    }[];
    done: {
      id: number;
      title: string;
      members: string[];
      deadLine: string;
      priority: string;
      description: string;
    }[];
  }>;
};
interface ProjectState {
  [key: number]: boolean;
}

interface TaskState {
  [key: string]: boolean;
}

const Collapsible = React.memo(({ projects }: Collapsible) => {
  const [isOpenProject, setIsOpenProject] = useState<ProjectState>({});
  const [isOpenTask, setIsOpenTask] = useState<TaskState>({});

  const handleTaskOpening = (id: string) => {
    const newIsOpenTask = { ...isOpenTask };
    newIsOpenTask[id] = !newIsOpenTask[id];
    setIsOpenTask(newIsOpenTask);

    // TODO

  };

  const handleProjectOpening = (id: number) => {
    const newIsOpenProject = { ...isOpenProject };
    newIsOpenProject[id] = !newIsOpenProject[id];
    setIsOpenProject(newIsOpenProject);
  };

  return (
    <>
      {projects.map(({ name, id, pending, inProgress, done }) => (
        <div className="collapse" key={id}>
          <input
            type="checkbox"
            className="peer"
            onChange={() => {
              handleProjectOpening(id);
            }}
          />
          <div className="collapse-title flex items-center">
            <div className="font-bold text-lg">
              {!isOpenProject[id] ? (
                <TfiArrowCircleUp />
              ) : (
                <TfiArrowCircleDown />
              )}
            </div>
            <div className="mr-3 font-bold">{name}</div>
          </div>
          <div className="collapse-content">
            <div className="overflow-x-auto">
              {/* SubCollapse */}
              <div className="collapse">
                <input
                  type="checkbox"
                  className="peer p-0 m-0"
                  onChange={() => {
                    handleTaskOpening("pending");
                  }}
                />

                <div className="collapse-title flex items-center">
                  {!isOpenTask["pending"] ? (
                    <TfiArrowCircleUp />
                  ) : (
                    <TfiArrowCircleDown />
                  )}
                  <div className="mr-2 bg-F92E8F px-3 py-1 rounded-sm text-base text-white">
                    Pending
                  </div>
                  <span className="mr-2 text-xs">{pending.length} تسک</span>
                </div>

                <div className="collapse-content">
                  <table className="table w-full text-right">
                    <thead>
                      <tr className="text-base font-medium">
                        <th></th>
                        <th>اعضا</th>
                        <th>ددلاین</th>
                        <th>اولویت</th>
                        <th>توضیحات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pending.map(
                        ({ title, members, deadLine, priority, id }) => (
                          <tr key={id} className="text-xs">
                            <th className="flex items-center">
                              <div className="w-4 h-4 bg-F92E8F rounded-sm ml-2"></div>
                              {title}
                            </th>
                            <th>{members}</th>
                            <td>{deadLine}</td>
                            <td>{priority}</td>
                            <td>
                              <CiTextAlignRight />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
         
              {/* SubCollapse */}
              <div className="collapse">
                <input
                  type="checkbox"
                  className="peer"
                  onChange={() => {
                    handleTaskOpening("inProgress");
                  }}
                />

                <div className="collapse-title flex items-center">
                  {!isOpenTask["inProgress"] ? (
                    <TfiArrowCircleUp />
                  ) : (
                    <TfiArrowCircleDown />
                  )}
                  <div className="mr-2 bg-F98F2E px-3 py-1 rounded-sm text-base text-white">
                    inProgress
                  </div>
                  <span className="mr-2 text-xs">{inProgress.length} تسک</span>
                </div>
                <div className="collapse-content">
                  <table className="table w-full text-right">
                    <thead>
                      <tr className="text-base font-medium">
                        <th></th>
                        <th>اعضا</th>
                        <th>ددلاین</th>
                        <th>اولویت</th>
                        <th>توضیحات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inProgress.map(
                        ({ title, members, deadLine, priority, id }) => (
                          <tr key={id} className="text-xs">
                            <th className="flex items-center">
                              <div className="w-4 h-4 bg-F98F2E rounded-sm ml-2"></div>
                              {title}
                            </th>
                            <th>{members}</th>
                            <td>{deadLine}</td>
                            <td>{priority}</td>
                            <td>
                              <CiTextAlignRight />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SubCollapse */}
              <div className="collapse">
                <input
                  type="checkbox"
                  className="peer"
                  onChange={() => {
                    handleTaskOpening("done");
                  }}
                />

                <div className="collapse-title flex items-center">
                  {!isOpenTask["done"] ? (
                    <TfiArrowCircleUp />
                  ) : (
                    <TfiArrowCircleDown />
                  )}
                  <div className="mr-2 bg-43BB0B px-3 py-1 rounded-sm text-base text-white">
                    Done
                  </div>
                  <span className="mr-2 text-xs">{done.length} تسک</span>
                </div>
                <div className="collapse-content">
                  <table className="table w-full text-right">
                    <thead>
                      <tr className="text-base font-medium">
                        <th></th>
                        <th>اعضا</th>
                        <th>ددلاین</th>
                        <th>اولویت</th>
                        <th>توضیحات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {done.map(
                        ({ title, members, deadLine, priority, id }) => (
                          <tr key={id} className="text-xs">
                            <th className="flex items-center">
                              <div className="w-4 h-4 bg-43BB0B rounded-sm ml-2"></div>
                              {title}
                            </th>
                            <th>{members}</th>
                            <td>{deadLine}</td>
                            <td>{priority}</td>
                            <td>
                              <CiTextAlignRight />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

export default Collapsible;
