import { Button } from "./Button";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ButtonProps {
  onClick?: () => void,
  className?: string,
  text: string;
}

export const CancelButton: React.FC<ButtonProps> = ({ text, onClick, className = '' }) => (
  <Button
    onClick={onClick}
    className={`
    text-sm flex items-center gap-2 justify-center cursor-pointer
    border border-red-400 text-red-500 bg-transparent
    hover:bg-red-50
    transition-colors duration-300
    shadow-none
    rounded-full
    ${className}
  `} type="button">
    <IoIosCloseCircleOutline size={18} className="text-red-500" />
    <p className="text-red-500">{text}</p>
  </Button>
);