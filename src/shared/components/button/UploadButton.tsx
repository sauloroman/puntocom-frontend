import { Button } from "./Button";
import { FaUpload } from "react-icons/fa";

interface ButtonProps {
  text: string;
}

export const UploadButton: React.FC<ButtonProps> = ({ text }) => (
  <Button
    type="button"
    className="
      cursor-pointer
      text-sm flex items-center gap-2 justify-center
      bg-[linear-gradient(to_right,#005C97_0%,#363795_51%,#005C97_100%)]
      bg-[length:200%_auto]
      hover:bg-[position:right_center]
      transition-all duration-500
      text-white
      shadow-[0_0_20px_#eee]
      rounded-full
      px-5 py-2
    "
  >
    <FaUpload size={15} className="text-white" />
    <p className="text-white">{text}</p>
  </Button>
);
