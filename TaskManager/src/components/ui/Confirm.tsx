
type ConfirmProps = {
    cancel : (arg:boolean) => void;
    accept : any;
    status : string;
}

const Confirm = ({accept,cancel,status}:ConfirmProps) => {
  return (
    <div className="flex items-center justify-around ">
      <p className="text-sm px-1 dark:bg-transparent ">از حذف {status} مطمئنی ؟</p>
      <button
        className="focus:outline-none  mr-3 text-sm"
        onClick={(e) => {
          e.stopPropagation();
          cancel(false)
        }}
      >
        لغو
      </button>
      <button
        className="text-208D8E mr-3 focus:outline-none text-sm dark:text-[#F1B127]"
        onClick={accept}
      >
        تایید
      </button>
    </div>
  );
};

export default Confirm;
