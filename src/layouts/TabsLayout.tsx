import React from 'react'

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
  return (
    <div className="w-full h-full flex flex-col">

      <nav className="flex gap-3 border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab
          
          return (
            <button
              key={tab}
              onClick={() => onTabChange?.(tab)}
              className={`
                relative px-4 py-2 text-sm rounded-t-lg transition-colors cursor-pointer
                ${isActive 
                  ? "text-pink-600 bg-pink-50 border-b-2 border-pink-600" 
                  : "text-gray-500 hover:text-pink-600 hover:bg-pink-50"}
              `}
              aria-selected={isActive}
            >
              {tab}
            </button>
          )
        })}
      </nav>

      <div className="flex-1 p-4 py-6 bg-white">
        {children}
      </div>
    </div>
  )
}
