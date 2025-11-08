import { Button } from "./Button";
import { FaWhatsapp } from "react-icons/fa";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  className?: string;
}

export const WhatsAppButton: React.FC<ButtonProps> = ({ text, onClick, disabled = false, className = '' }) => (
  <Button 
    onClick={onClick}
    type='button'
    disabled={disabled}
    className={`
      text-sm flex items-center gap-2 justify-center cursor-pointer
      bg-[linear-gradient(to_right,#25D366_0%,#128C7E_51%,#25D366_100%)]
      bg-[length:200%_auto]
      hover:bg-[position:right_center]
      transition-all duration-500
      text-white
      shadow-[0_0_20px_#25D366]
      rounded-full
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `}>
    <FaWhatsapp size={20} className="text-white" />
    <p className="text-white">{text}</p>
  </Button>
);