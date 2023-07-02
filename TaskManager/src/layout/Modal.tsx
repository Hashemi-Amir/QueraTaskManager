import { useAppDispatch } from "../services/app/hook";
import { closeAllModals } from "../services/app/store";

type modalProps = {
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ children, className }: modalProps) => {
  const dispatch = useAppDispatch();
  const handleOnModals = () => {
    dispatch(closeAllModals());
  };

  return (
    <div
      onClick={handleOnModals}
      className={`modal opacity-100 visible z-50 pointer-events-auto flex justify-center items-center select-none  ${className} `}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
