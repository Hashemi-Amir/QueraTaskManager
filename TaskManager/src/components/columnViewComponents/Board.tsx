const Board = () => {
  return (
    <div className="min-w-[250px] h-fit max-h-[80vh] bg-red-500 overflow-y-auto flex-shrink scrollbar-none pb-5">
      {/* Sticky Header */}
      <div className="bg-blue-600 sticky top-0 h-10">header</div>
      {/* Task Cards */}
      <div className="bg-green-500 w-full h-36 mt-3">card</div>
      <div className="bg-green-500 w-full h-36 mt-3">card</div>
      <div className="bg-green-500 w-full h-36 mt-3">card</div>
      <div className="bg-green-500 w-full h-36 mt-3">card</div>
      <div className="bg-green-500 w-full h-36 mt-3">card</div>
      <div className="bg-green-500 w-full h-36 mt-3">card</div>
    </div>
  );
};

export default Board;
