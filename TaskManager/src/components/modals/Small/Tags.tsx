import { BiSearch } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import TagMore from "./TagMore";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AXIOS from "../../../services/features/utils/AXIOS";

type tagProps = {
  handleTagsModal: () => void;
};



const Tags = ({ handleTagsModal }: tagProps) => {
  const [tagMore, setTagMore] = useState({
    modal: '',
    position: { top: 0, left: 0 },
  });

  const [data, setData] = useState([]);

  const handleTagMore = (e?: React.MouseEvent<HTMLElement, MouseEvent> , id?:any) => {
    if(tagMore.modal === ''){
      const pos: { top: number; left: number } = {
        top: e?.clientY || 0,
        left: e?.clientX || 0,
      };
      setTagMore({ ...tagMore, modal: id, position: pos });
    }
    else{
      setTagMore({ ...tagMore, modal: '', position: {top:0,left:0} });
    }
  };

  useEffect(() => {
    AXIOS.get("/api/tags/task/648d715fc7f0f22d6434cc7a")
      .then((res) => {
        console.log(res);
        setData(res.data?.tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const liSayle = "w-full mt-3 flex items-center justify-between";
  const tagsStyle =
    "px-2 py-1  rounded-md text-black text-sm font-normal cursor-pointer";
  return (
    <div className="absolute -top-8 -left-28 mr-4  w-48 p-3 z-50 rounded-lg bg-white shadow-lg ">
      {/* searchBox */}
      <div className="w-full px-3 py-1 flex flex-row-reverse items-center justify-center rounded-md bg-[#E9E9E9]">
        <input
          type="text"
          placeholder="جستجو یا ساختن تگ"
          name="tagInp"
          id="tagInp"
          className="w-3/4 text-xs bg-transparent focus:outline-none"
        />
        <span className="ml-3 text-[#BDBDBD] text-2xl">
          <BiSearch />
        </span>
      </div>

      {/* list of tags */}
      <ul className="w-full h-28 mt-3 ">
        {data &&
          data.map(({tagName,_id ,color}) => {
            return (
              <li className={liSayle} key={_id}>
                <span className={`${tagsStyle}`} style={{backgroundColor:color}}>{tagName}</span>
                <span
                  className="text-BDC0C6 cursor-pointer"
                  onClick={(e) => handleTagMore(e,_id)}
                >
                  <FiMoreHorizontal />
                </span>
                <div className="absolute -left-24 top-10">

                </div>
              </li>
            );
          })}
        {/* <li className={liSayle}>
          <span className={`${tagsStyle} bg-EBC8C8`}>درس</span>
          <span
            className="text-BDC0C6 cursor-pointer"
            onClick={(e) => handleTagMore(e)}
          >
            <FiMoreHorizontal />
          </span>
          <div className="absolute left-0 top-20">
            {tagMore.modal && createPortal(<TagMore />, document.body)}
          </div>
        </li>

        <li className={liSayle}>
          <span className={`${tagsStyle} bg-C3B7F2`}>کار</span>
          <span className="text-BDC0C6 cursor-pointer">
            <FiMoreHorizontal />
          </span>
        </li>

        <li className={liSayle}>
          <span className={`${tagsStyle} bg-7FFAFA`}>پروژه</span>
          <span className="text-BDC0C6 cursor-pointer">
            <FiMoreHorizontal />
          </span>
        </li> */}
      </ul>
      {tagMore.modal && createPortal(
        <TagMore position={tagMore.position}/>,
        document.body
        )
      }

    </div>
  );
};

export default Tags;
