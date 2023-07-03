import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import { GoMention } from "react-icons/go";
import { BsChatText, BsLink45Deg } from "react-icons/bs";
import { FiFile } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import Button from "../ui/Button";
import { useEffect, useRef, useState } from "react";
import { addComment } from "../../services/app/store";
import { useAppDispatch, useAppSelector } from "../../services/app/hook";

type AddCommentProps = {
  taskId: string;
};

const AddComment = ({ taskId }: AddCommentProps) => {
  const { theme } = useAppSelector((state) => state.user);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const textAreRef = useRef<HTMLTextAreaElement>(null);

  const pickEmoji = ({ emoji }: EmojiClickData) => {
    if (textAreRef.current) textAreRef.current.value += emoji;
  };

  useEffect(() => {
    if (!isCommentOpen) setShowEmojis(false);
  }, [isCommentOpen]);

  const handleShowEmojis = () => {
    // Set the focus to the end of the text
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(textAreRef.current as Node);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
    // Move the cursor to the end of the text
    textAreRef.current?.focus();
    setShowEmojis(!showEmojis);
  };

  const formClickHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dispatch = useAppDispatch();

  const handleCommentSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    let comment;
    if (textAreRef.current) {
      comment = textAreRef.current.value;
      textAreRef.current.value = "";
    } else comment = "";
    if (comment.length < 2) return;
    setIsCommentOpen(false);
    dispatch(addComment({ text: comment, taskId }));
    textAreRef.current?.blur();
  };

  return (
    <div
      className={` w-1/2 absolute border border-b-0 left-[-0.5px] dark:border-[#57585f] bottom-0 h-52 transition-all ${
        isCommentOpen
          ? "translate-y-0 shadow-[0px_-4px_12px_0px_#00000040] rounded-tr-md"
          : "translate-y-32"
      } `}
    >
      <form
        onFocus={() => setIsCommentOpen(true)}
        onBlur={() => {
          setIsCommentOpen(false);
        }}
        className={`h-full pb-6`}
        onClick={() => !isCommentOpen && textAreRef.current?.focus()}
      >
        <textarea
          ref={textAreRef}
          placeholder="کامنت"
          className=" p-3 pb-12 pl-12 w-full h-full resize-none outline-none scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-white rounded-tr-md dark:bg-[#15202b]"
        />

        <BsChatText className="absolute top-3 left-6 text-AEAEAE" />

        {/* Comment Footer */}
        <div
          onMouseDown={formClickHandler}
          className="absolute bottom-0 w-full justify-between items-center flex bg-white dark:bg-[#15202b]"
        >
          {/* Actions on the comment field */}
          <div className="flex gap-4 mb-1 mr-6 items-center relative">
            <GoMention className=" cursor-pointer text-xl text-C9CBDA hover:scale-125 transition-all" />
            <BsLink45Deg className="cursor-pointer text-2xl text-C9CBDA hover:scale-125 transition-all" />
            <FiFile className="cursor-pointer text-xl text-C9CBDA hover:scale-125 transition-all" />

            {/* Emoji Icon and Emoji Picker */}
            <BsEmojiSmile
              onClick={handleShowEmojis}
              className="cursor-pointer text-xl text-C9CBDA hover:scale-125 transition-all "
            />
            <div
              dir="ltr"
              className={`absolute -bottom-[104px] left-[65%] scale-[.6] shadow-md ${
                !showEmojis && "hidden"
              }`}
            >
              <EmojiPicker
                theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                skinTonesDisabled
                onEmojiClick={pickEmoji}
                emojiStyle={EmojiStyle.NATIVE}
                lazyLoadEmojis
              />
            </div>
          </div>
          <div className="mb-3 ml-5 mr-auto max-w-fit ">
            <Button
              onClick={handleCommentSubmit}
              type="submit"
              value={"ثبت کامنت"}
              className="font-semibold h-[31px] py-[6px] px-3 text-xs"
            ></Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
