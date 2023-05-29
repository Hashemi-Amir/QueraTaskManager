import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { GoMention } from "react-icons/go";
import { BsChatText, BsLink45Deg } from "react-icons/bs";
import { FiFile } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import Button from "../ui/Button";
import { useEffect, useRef, useState } from "react";

const Comment = () => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");
  // const [cursorPosition, setCursorPosition] = useState<number>(0);
  const textAreRef = useRef<HTMLTextAreaElement>(null);

  const pickEmoji = ({ emoji }: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emoji);
    // setCursorPosition(message.length + emoji.length);
  };

  useEffect(() => {
    // textAreRef.current!.selectionEnd = cursorPosition;
    if (!isCommentOpen) setShowEmojis(false);
  }, [isCommentOpen]);

  const handleShowEmojis = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    textAreRef.current?.focus();
    setShowEmojis(!showEmojis);
  };

  const handleIconClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    textAreRef.current?.focus();
  };

  const inputCommentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div
      className={`comment bg-white w-1/2 absolute border left-[-0.5px] bottom-0 h-52 rounded-tr-md transition-all ${
        isCommentOpen
          ? "translate-y-0 shadow-[0px_-4px_12px_0px_#00000040]"
          : "translate-y-32"
      } `}
    >
      <form
        onFocus={() => setIsCommentOpen(true)}
        onBlur={() => {
          if (!showEmojis) setIsCommentOpen(false);
        }}
        className="h-full"
      >
        <textarea
          onChange={inputCommentHandler}
          value={message}
          ref={textAreRef}
          placeholder="کامنت"
          className="m-1 p-3 pl-12 w-full h-3/4 resize-none outline-none scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-white"
        />

        <BsChatText className="absolute top-3 left-6 text-AEAEAE" />

        {/* Comment Footer */}
        <div className="absolute bottom-0 w-full justify-between flex">
          {/* Actions on the comment field */}
          <div className="flex gap-4 mr-6 items-center relative">
            <GoMention
              onClick={handleIconClick}
              className=" cursor-pointer text-xl text-C9CBDA hover:scale-125 transition-all"
            />

            <BsLink45Deg
              onClick={handleIconClick}
              className="cursor-pointer text-2xl text-C9CBDA hover:scale-125 transition-all"
            />
            <FiFile
              onClick={handleIconClick}
              className="cursor-pointer text-xl text-C9CBDA hover:scale-125 transition-all"
            />

            {/* Emoji Icon and Emoji Picker */}
            <BsEmojiSmile
              onClick={handleShowEmojis}
              className="cursor-pointer text-xl text-C9CBDA hover:scale-125 transition-all"
            />
            <div
              className={`absolute bottom-0 right-[-17%] scale-75 ${
                !showEmojis && "hidden"
              }`}
            >
              <EmojiPicker onEmojiClick={pickEmoji} />
            </div>
          </div>

          <div className="mb-4 ml-5">
            <Button value={"ثبت کامنت"}></Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Comment;
