import { Button } from "./Button";
import { FaSave } from "react-icons/fa";

interface ButtonProps {
  text: string;
}

export const SaveButton: React.FC<ButtonProps> = ({ text }) => (
  <Button 
  type="submit"
  className="
    text-sm flex items-center gap-2 justify-center cursor-pointer
    bg-[linear-gradient(to_right,#614385_0%,#516395_51%,#614385_100%)]
    bg-[length:200%_auto]
    hover:bg-[position:right_center]
    transition-all duration-500
    text-white
    shadow-[0_0_20px_#eee]
    rounded-full
  ">
    <FaSave size={15} className="text-white" />
    <p className="text-white">{text}</p>
  </Button>
);
