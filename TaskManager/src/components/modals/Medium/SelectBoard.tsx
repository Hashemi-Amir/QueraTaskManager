import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import CloseIcon from "../../ui/Close";

type dataList = {
  _id: string;
  name: string;
};
type SelectBoardProps = {
  toggleModal: (modalName: string ) => void;
  data: dataList[];
  selectedHandle: (id: string ) => void;
  status :string;
};

const SelectBoard = ({
  toggleModal,
  data,
  selectedHandle,
  status
}: SelectBoardProps) => {
  const [boardId, setBoardId] = useState('');
  const handleSelectValue = (event: React.ChangeEvent<HTMLElement>) => {
    const element = event.target as HTMLInputElement;
    setBoardId(element.value);
  };
  useEffect(()=> {
    // console.log(data);
  },[status])

  return (
    <div className="modal-box w-3/4 max-w-lgl min-w-[500px]">
      {data.length > 0 ? (
        <div className="p-5 bg-white rounded-lg">
          {/* card header */}
          <div className="w-full flex justify-between items-center">
            <label
              htmlFor="my-modal-3"
              className="text-323232 cursor-pointer"
              onClick={() => toggleModal("")}
            >
              <CloseIcon />
            </label>

            <div className="font-semibold text-2xl text-black">انتخاب {status}</div>

            <span></span>
          </div>
          {/* card content */}

          <div className="mt-11 w-full ">
            {/* selectedList */}
            <div className="flex items-center justify-center">
              <select
                dir="rtl"
                onChange={handleSelectValue}
                className="select select-accent w-full max-w-xs text-center"
                id='sel'
                defaultValue={boardId}
              >
                <option disabled value={boardId}>
                  {status} مورد نظرت رو انتخاب کن ;)
                </option>
                {data &&
                  data.map(item => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* button */}
            <div className="mt-16">
              <Button
                value={"ادامه"}
                onClick={() => {
                  if(boardId.trim()){
                    selectedHandle(boardId);
                    setBoardId(``)
                  }
                  else if(boardId === ''){
                    const select = document.querySelector<HTMLSelectElement>('#sel')
                    const sel:HTMLCollectionOf<HTMLOptionElement> | undefined = select?.selectedOptions

                    if(sel && sel.length > 0){
                    const id = sel[0].getAttribute('value')!;
                    setBoardId(id);
                    }
                    
                    
                  }
                  
                  
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between items-center">
            <label
              htmlFor="my-modal-3"
              className="text-323232 cursor-pointer"
              onClick={() => toggleModal("")}
            >
              <CloseIcon />
            </label>

            <div className="font-semibold text-2xl text-black"></div>

            <span></span>
          </div>
          <div className="font-semibold text-xl text-black text-center">
            {status}ی وجود نداره ، یدونه بساز
          </div>
        </>
      )}
    </div>
  );
};

export default SelectBoard;
