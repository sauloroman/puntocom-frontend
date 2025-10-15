import { Button } from "./Button";
import { FaShoppingCart } from "react-icons/fa";

interface ButtonProps {
  text: string;
  className?: string,
  submit?: boolean,
  onClick?: () => void;
}

export const AddToCartButton: React.FC<ButtonProps> = ({ className, text, onClick, submit = false }) => (
  <Button
    type={submit ? 'submit' : 'button'}
    onClick={onClick}
    className={`
      text-sm flex items-center gap-2 justify-center cursor-pointer
      bg-[linear-gradient(to_right,#0F2027_0%,#203A43_51%,#2C5364_100%)]
      bg-[length:200%_auto]
      hover:bg-[position:right_center]
      transition-all duration-500
      text-white
      shadow-[0_0_20px_#a0c4ff]
      rounded-full
      px-5 py-2
      ${className}
    `}
  >
    <FaShoppingCart size={15} className="text-white" />
    <p className="text-white font-medium">{text}</p>
  </Button>
);
