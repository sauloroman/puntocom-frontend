import React from 'react'
import { LuFileText } from 'react-icons/lu'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ModalNames } from '../../../interfaces/ui/modal.interface'
import { useModal, useReports, useTheme } from '../../../shared/hooks'

interface Props {
  reportId: string
}

export const TableReportsButtons: React.FC<Props> = ({ reportId }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const { getReportById, selectReportId } = useReports()
  const { onOpenModal } = useModal()

  const onDeleteReport = () => {
    selectReportId(reportId)
    onOpenModal(ModalNames.confirmDeleteReport)
  }

  const onViewReport = () => {
    getReportById(reportId)
    selectReportId(reportId)
  }

  return (
    <>
      <button
        onClick={onViewReport}
        className={`
          cursor-pointer w-fit text-center px-4 py-2 text-sm flex items-center gap-2 transition-colors
          ${isDark 
            ? 'text-gray-300 hover:bg-gray-700' 
            : 'text-gray-600 hover:bg-red-50'
          }
        `}
      >
        <LuFileText size={20} />
      </button>
      <button
        onClick={onDeleteReport}
        className={`
          cursor-pointer w-fit text-center px-4 py-2 text-sm flex items-center gap-2 transition-colors
          ${isDark 
            ? 'text-red-400 hover:bg-gray-700' 
            : 'text-red-600 hover:bg-gray-50'
          }
        `}
      >
        <RiDeleteBin6Line size={20} />
      </button>
    </>
  )
}
