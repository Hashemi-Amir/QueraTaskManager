type checkbox = {
  id: string;
  label: string;
  //   value: boolean;
  onChange?: () => void;
};

const CheckBoxComponent = ({ id, label, onChange }: checkbox) => {
  return (
    <div className="flex items-center w-full">
      <input
        className="accent-green-15 h-4 w-4 ml-3 border rounded-3xl hover:cursor-pointer"
        id={id}
        type="checkbox"
        // checked={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
export default CheckBoxComponent;
