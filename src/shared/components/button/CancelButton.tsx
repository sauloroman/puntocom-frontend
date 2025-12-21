import { Button } from "./Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useTheme } from "../../hooks";

interface ButtonProps {
  onClick?: () => void,
  className?: string,
  text: string;
}

export const CancelButton: React.FC<ButtonProps> = ({ text, onClick, className = '' }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      onClick={onClick}
      className={`
        text-sm flex items-center gap-2 justify-center cursor-pointer
        border rounded-full shadow-none
        transition-colors duration-300
        ${isDark
          ? 'border-red-500/70 text-red-400 bg-transparent hover:bg-red-950/30'
          : 'border-red-400 text-red-500 bg-transparent hover:bg-red-50'
        }
        ${className}
      `} 
      type="button"
    >
      <IoIosCloseCircleOutline 
        size={18} 
        className={isDark ? 'text-red-400' : 'text-red-500'} 
      />
      <p className={isDark ? 'text-red-400' : 'text-red-500'}>{text}</p>
    </Button>
  )
};