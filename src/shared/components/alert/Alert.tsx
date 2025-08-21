import React from "react";
import { type IconType } from "react-icons";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdErrorOutline, MdWarningAmber } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import type { AlertType } from "../../../interfaces/ui/alert.interface";

interface AlertProps {
  type?: AlertType;
  title: string;
  text?: string;
  className?: string;
}

const alertConfig: Record<AlertType, { icon: IconType; color: string; bg: string; border: string }> = {
  info: {
    icon: AiOutlineInfoCircle,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  success: {
    icon: IoCheckmarkCircleOutline,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  warning: {
    icon: MdWarningAmber,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  error: {
    icon: MdErrorOutline,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
};

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  text,
  className = "",
}) => {
  const { icon: Icon, color, bg, border } = alertConfig[type];

  return (
    <div
      className={`flex items-start gap-3 p-4 border rounded-xl shadow-sm ${bg} ${border} ${className}`}
    >
      <div className={`${color} text-2xl`}>
        <Icon />
      </div>
      <div className="flex-1">
        <h4 className={`font-semibold ${color}`}>{title}</h4>
        {text && <p className="text-sm text-gray-700 mt-1">{text}</p>}
      </div>
    </div>
  );
};
