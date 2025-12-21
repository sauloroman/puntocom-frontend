import { Button } from "./Button";
import { FaShoppingCart } from "react-icons/fa";
import { useTheme } from "../../hooks";

interface ButtonProps {
  text: string;
  className?: string,
  submit?: boolean,
  onClick?: () => void;
}

export const AddToCartButton: React.FC<ButtonProps> = ({ className, text, onClick, submit = false }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      className={`
        text-sm flex items-center gap-2 justify-center cursor-pointer
        bg-[length:200%_auto]
        hover:bg-[position:right_center]
        transition-all duration-500
        text-white
        rounded-full
        px-5 py-2
        ${isDark
          ? 'bg-[linear-gradient(to_right,#4C1D95_0%,#5B21B6_51%,#6D28D9_100%)] shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]'
          : 'bg-[linear-gradient(to_right,#0F2027_0%,#203A43_51%,#2C5364_100%)] shadow-[0_0_20px_#a0c4ff] hover:shadow-[0_0_30px_#a0c4ff]'
        }
        ${className}
      `}
    >
      <FaShoppingCart size={15} className="text-white" />
      <p className="text-white font-medium">{text}</p>
    </Button>
  )
};