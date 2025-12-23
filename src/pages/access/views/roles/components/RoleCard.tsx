import { FaCheckCircle } from "react-icons/fa"
import type { RoleCardData } from "../../../../../interfaces/ui/role.interface"
import { useTheme } from "../../../../../shared/hooks"

export const RoleCard: React.FC<RoleCardData> = ({
  title,
  subtitle,
  icon,
  color,
  darkColor,
  bgColor,
  darkBgColor,
  permissions,
  highlighted = false
}) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`
        relative rounded-2xl p-8 transition-all duration-300
        ${highlighted 
          ? `${isDark ? 'bg-gradient-to-br from-indigo-900 to-purple-900 border-2 border-indigo-500' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-400'} shadow-xl scale-105 z-10`
          : `${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-md hover:shadow-xl hover:scale-105`
        }
      `}
    >
      {highlighted && (
        <div className={`
          absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold transition-colors
          ${isDark ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'}
        `}>
          ROL DE TU CUENTA
        </div>
      )}

      <div className="flex flex-col items-center mb-6">
        <div
          className={`
            w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors
            ${isDark ? darkBgColor : bgColor}
          `}
        >
          <div className={`text-4xl ${isDark ? darkColor : color}`}>
            {icon}
          </div>
        </div>

        <h3 className={`
          text-2xl font-bold mb-2 transition-colors
          ${isDark ? 'text-gray-100' : 'text-gray-900'}
        `}>
          {title}
        </h3>

        <p className={`
          text-sm text-center transition-colors
          ${isDark ? 'text-gray-400' : 'text-gray-600'}
        `}>
          {subtitle}
        </p>
      </div>

      <div className={`
        w-full h-px mb-6 transition-colors
        ${isDark ? 'bg-gray-700' : 'bg-gray-200'}
      `} />

      <ul className="space-y-3 max-h-96 overflow-y-auto pr-2 no-scrollbar">
        {permissions.map((item, index) => (
          <li
            key={index}
            className={`
              flex items-start gap-3 text-sm transition-colors
              ${item.included 
                ? (isDark ? 'text-gray-200' : 'text-gray-700')
                : (isDark ? 'text-gray-600 line-through' : 'text-gray-400 line-through')
              }
            `}
          >
            <FaCheckCircle
              className={`
                flex-shrink-0 mt-0.5 transition-colors
                ${item.included 
                  ? (isDark ? 'text-green-400' : 'text-green-600')
                  : (isDark ? 'text-gray-600' : 'text-gray-300')
                }
              `}
              size={16}
            />
            <span>{item.permission}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}