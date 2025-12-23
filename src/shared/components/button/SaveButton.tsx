import { useTheme } from "../../hooks";
import { Button } from "./Button";
import { FaSave } from "react-icons/fa";

interface ButtonProps {
  submit?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean,
  text: string;
}

export const SaveButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  submit = false,
  disabled = false,
  className = "",
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      type={submit ? "submit" : "button"}
      className={`
        text-sm flex items-center gap-2 justify-center cursor-pointer
        bg-[linear-gradient(to_right,#614385_0%,#516395_51%,#614385_100%)]
        bg-[length:200%_auto] hover:bg-[position:right_center]
        transition-all duration-500 text-white rounded-full
        shadow-[0_0_15px_rgba(97,67,133,0.4)]
        ${isDark ? "hover:shadow-[0_0_20px_rgba(114,92,136,0.6)]" : "hover:shadow-[0_0_20px_rgba(97,67,133,0.5)]"}
        ${className}
      `}
    >
      <FaSave size={15} />
      <p>{text}</p>
    </Button>
  );
};
