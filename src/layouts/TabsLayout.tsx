import React from 'react'
import { useTheme } from '../shared/hooks'

interface TabsLayoutProps {
  children: React.ReactNode
  tabs?: string[]
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export const TabsLayout: React.FC<TabsLayoutProps> = ({
  children,
  tabs = [],
  activeTab,
  onTabChange
}) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="w-full h-full flex flex-col">

      <nav className={`
        flex gap-3 border-b transition-colors
        ${isDark ? 'border-gray-700' : 'border-gray-200'}
      `}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab
          
          return (
            <button
              key={tab}
              onClick={() => onTabChange?.(tab)}
              className={`
                relative px-4 py-2 text-sm rounded-t-lg transition-colors cursor-pointer
                ${isActive 
                  ? isDark
                    ? "text-indigo-400 bg-indigo-950/30 border-b-2 border-indigo-400" 
                    : "text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600"
                  : isDark
                    ? "text-gray-400 hover:text-indigo-400 hover:bg-indigo-950/20"
                    : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
                }
              `}
              aria-selected={isActive}
            >
              {tab}
            </button>
          )
        })}
      </nav>

      <div className={`
        flex-1 p-4 py-6 transition-colors
        ${isDark ? 'bg-gray-900' : 'bg-white'}
      `}>
        {children}
      </div>
    </div>
  )
}