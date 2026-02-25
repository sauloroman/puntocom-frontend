import React, { useEffect, useState } from 'react'

const STEPS = ['Recopilando datos...', 'Procesando registros...', 'Construyendo reporte...', 'Casi listo...']

export const SpinnerScreen: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev))
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-blue-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl tracking-[0.5em] uppercase text-blue-700 dark:text-blue-300 font-semibold">
          PuntoCom
        </span>
        <div className="h-px w-32 bg-blue-300 dark:bg-blue-700 rounded-full" />
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-[3px] border-blue-200 dark:border-blue-900" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-600 dark:border-t-blue-400 animate-spin" />
          <div className="absolute inset-[6px] rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h6v6m-8 4h10a2 2 0 002-2V7l-5-5H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Generando Reporte</p>
          <p key={stepIndex} className="text-xs tracking-wide text-blue-400 dark:text-blue-500 animate-pulse">
            {STEPS[stepIndex]}
          </p>
        </div>
      </div>

      <div className="flex gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i <= stepIndex ? 'w-6 bg-blue-600 dark:bg-blue-400' : 'w-2 bg-blue-200 dark:bg-blue-800'
            }`}
          />
        ))}
      </div>
    </div>
  )
}