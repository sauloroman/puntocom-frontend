import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdErrorOutline, MdWarningAmber } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import type { AlertType } from "../../../interfaces/ui/alert.interface";
import { useTheme } from "../../hooks";
import type { IconType } from "react-icons";

interface AlertProps {
  type?: AlertType;
  title: string;
  text?: string;
  className?: string;
}

const alertConfig: Record<
  AlertType,
  {
    icon: IconType;
    lightColors: {
      icon: string;
      title: string;
      text: string;
      bg: string;
      border: string;
    };
    darkColors: {
      icon: string;
      title: string;
      text: string;
      bg: string;
      border: string;
    };
  }
> = {
  info: {
    icon: AiOutlineInfoCircle,
    lightColors: {
      icon: "text-indigo-600",
      title: "text-indigo-900",
      text: "text-indigo-700",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
    },
    darkColors: {
      icon: "text-indigo-400",
      title: "text-indigo-100",
      text: "text-indigo-200",
      bg: "bg-indigo-950",
      border: "border-indigo-800",
    },
  },
  success: {
    icon: IoCheckmarkCircleOutline,
    lightColors: {
      icon: "text-emerald-600",
      title: "text-emerald-900",
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    darkColors: {
      icon: "text-emerald-400",
      title: "text-emerald-100",
      text: "text-emerald-200",
      bg: "bg-emerald-950",
      border: "border-emerald-800",
    },
  },
  warning: {
    icon: MdWarningAmber,
    lightColors: {
      icon: "text-amber-600",
      title: "text-amber-900",
      text: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    darkColors: {
      icon: "text-amber-400",
      title: "text-amber-100",
      text: "text-amber-200",
      bg: "bg-amber-950",
      border: "border-amber-800",
    },
  },
  error: {
    icon: MdErrorOutline,
    lightColors: {
      icon: "text-rose-600",
      title: "text-rose-900",
      text: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-200",
    },
    darkColors: {
      icon: "text-rose-400",
      title: "text-rose-100",
      text: "text-rose-200",
      bg: "bg-rose-950",
      border: "border-rose-800",
    },
  },
};

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  text,
  className = "",
}) => {
  const { theme } = useTheme();
  const config = alertConfig[type];
  const isDark = theme === "dark";
  
  const colors = isDark ? config.darkColors : config.lightColors;
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start gap-3 p-4 border rounded-xl shadow-sm transition-colors duration-200 ${colors.bg} ${colors.border} ${className}`}
    >
      <div className={`${colors.icon} text-2xl flex-shrink-0 mt-0.5`}>
        <Icon />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-semibold ${colors.title} mb-0.5`}>{title}</h4>
        {text && <p className={`text-sm ${colors.text} mt-1 leading-relaxed`}>{text}</p>}
      </div>
    </div>
  );
};