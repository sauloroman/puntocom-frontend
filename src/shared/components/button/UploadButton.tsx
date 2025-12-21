import { Button } from "./Button";
import { FaUpload } from "react-icons/fa";
import { useTheme } from "../../hooks";

interface ButtonProps {
  text: string;
}

export const UploadButton: React.FC<ButtonProps> = ({ text }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      type="button"
      className={`
        cursor-pointer
        text-sm flex items-center gap-2 justify-center
        bg-[length:200%_auto]
        hover:bg-[position:right_center]
        transition-all duration-500
        text-white
        rounded-full
        px-5 py-2
        ${isDark
          ? 'bg-[linear-gradient(to_right,#4C1D95_0%,#5B21B6_51%,#6D28D9_100%)] shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]'
          : 'bg-[linear-gradient(to_right,#005C97_0%,#363795_51%,#005C97_100%)] shadow-[0_0_20px_#eee] hover:shadow-[0_0_25px_#ddd]'
        }
      `}
    >
      <FaUpload size={15} className="text-white" />
      <p className="text-white">{text}</p>
    </Button>
  )
};