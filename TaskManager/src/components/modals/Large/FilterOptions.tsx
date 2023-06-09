import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

const FilterOptions = () => {
  const [where, setWhere] = useState({
    value: "",
    modal: false,
  });
  const [tag, setTag] = useState({
    value: "",
    modal: false,
  });
  const [isOrNot, setIsOrNot] = useState({
    value: "",
    modal: false,
  });

  const handleWhereDropDown = (e: any) => {
    setWhere({ ...where, value: e.target.innerHTML, modal: false });
  };
  const handleTagDropDown = (e: any) => {
    setTag({ ...tag, value: e.target.innerHTML, modal: false });
  };
  const handleIsOrNotDropDown = (e: any) => {
    setIsOrNot({ ...isOrNot, value: e.target.innerHTML, modal: false });
  };

  const filterOptionsStyle =
    "relative py-1 px-2 rounded-md flex items-center justify-between text-xs font-normal mr-3 border cursor-pointer";
  const liStyle =
    "w-full text-xs font-medium px-2 py-1 text-black mt-3 cursor-pointer";
  const tagsStyle =
    "px-2 py-1  rounded-md text-black text-sm font-normal cursor-pointer";
  return (
    <li className="w-full flex justify-between items-center mt-4 ">
      {/* options */}
      <div className="flex items-center">
        <span>تسک هایی که</span>

        {/* where */}
        <div className="w-44 relative inline-block ml-3">
          {/*drop down btn  */}
          <div
            className={`w-full ${filterOptionsStyle} `}
            onClick={() => setWhere({ ...where, modal: !where.modal })}
          >
            {where.value === "" ? (
              <span className="text-D3D3D3">انتخاب کنید</span>
            ) : (
              where.value
            )}
            <span>
              <IoIosArrowDown />
            </span>
          </div>

          {/* drop down content*/}
          {where.modal && (
            <ul className="w-full p-2 absolute bg-white shadow-lg rounded-lg mr-3">
              <li className="w-full flex flex-row-reverse items-center border-b justify-center bg-transparent">
                <input
                  type="text"
                  placeholder="جستجو فیلتر ها"
                  name="tagInp"
                  id="tagInp"
                  className="w-3/4 text-xs bg-transparent focus:outline-none"
                />
                <span className="ml-3 pr-2 text-208D8E text-2xl">
                  <BiSearch />
                </span>
              </li>

              <li className={liStyle} onClick={handleWhereDropDown}>
                تاریخ
              </li>
              <li className={liStyle} onClick={handleWhereDropDown}>
                تگ
              </li>
              <li className={liStyle} onClick={handleWhereDropDown}>
                اعضا
              </li>
              <li className={liStyle} onClick={handleWhereDropDown}>
                اولویت
              </li>
            </ul>
          )}
        </div>

        <span className="mr-3">آن ها</span>
        {/* tags */}
        <div className="w-36 relative inline-block">
          {/*drop down btn  */}
          <div
            className={`w-full ${filterOptionsStyle} `}
            onClick={() => setTag({ ...tag, modal: !tag.modal })}
          >
            {tag.value === "" ? (
              <span className="text-D3D3D3">انتخاب کنید</span>
            ) : (
              tag.value
            )}
            <span>
              <IoIosArrowDown />
            </span>
          </div>

          {/* drop down content*/}
          {tag.modal && (
            <ul className="w-full p-2 absolute bg-white shadow-lg rounded-lg mr-3">
              <li className="w-full flex flex-row-reverse items-center border-b justify-center bg-transparent">
                <input
                  type="text"
                  placeholder="جستجو فیلتر ها"
                  name="tagInp"
                  id="tagInp"
                  className="w-3/4 text-xs bg-transparent focus:outline-none"
                />
                <span className="ml-3 pr-2 text-208D8E text-2xl">
                  <BiSearch />
                </span>
              </li>

              <li className={liStyle}>
                <span
                  className={`${tagsStyle} bg-EBC8C8`}
                  onClick={handleTagDropDown}
                >
                  درس
                </span>
              </li>

              <li className={liStyle}>
                <span
                  className={`${tagsStyle} bg-C3B7F2`}
                  onClick={handleTagDropDown}
                >
                  کار
                </span>
              </li>

              <li className={liStyle}>
                <span
                  className={`${tagsStyle} bg-7FFAFA`}
                  onClick={handleTagDropDown}
                >
                  پروژه
                </span>
              </li>
            </ul>
          )}
        </div>

        {/* is or not */}
        <div className="w-28 relative inline-block mr-3">
          {/*drop down btn  */}
          <div
            className={`w-full ${filterOptionsStyle} `}
            onClick={() => setIsOrNot({ ...isOrNot, modal: !isOrNot.modal })}
          >
            {isOrNot.value === "" ? (
              <span className="text-D3D3D3">انتخاب کنید</span>
            ) : (
              isOrNot.value
            )}
            <span>
              <IoIosArrowDown />
            </span>
          </div>

          {/* drop down content*/}
          {isOrNot.modal && (
            <ul className="w-full p-2 absolute bg-white shadow-lg rounded-lg mr-3">
              <li className={liStyle} onClick={handleIsOrNotDropDown}>
                است
              </li>
              <li className={liStyle} onClick={handleIsOrNotDropDown}>
                نیست
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* delete options*/}
      <div className="cursor-pointer">
        <BsTrash />
      </div>
    </li>
  );
};

export default FilterOptions;
