import React from 'react'
import { EntityReportList } from './EntityReportList';

export const ReportsFolder: React.FC = () => {
  return (
    <section className='border border-gray-200 p-5 mt-5 rounded-2xl'>
      <EntityReportList />
    </section>
  )
}
