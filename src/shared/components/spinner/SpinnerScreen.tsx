import React, { useEffect, useState } from 'react'

const STEPS = [
  'Recopilando datos...',
  'Procesando registros...',
  'Construyendo reporte...',
  'Casi listo...'
]

export const SpinnerScreen: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev))
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-12 bg-white dark:bg-purple-900 transition-colors duration-300">

      <div className="flex flex-col items-center gap-2 animate-fade-in">
        <h1 className="text-3xl font-semibold tracking-wide text-indigo-700 dark:text-violet-300">
          PuntoCom
        </h1>
        <div className="h-[2px] w-28 bg-indigo-600 dark:bg-violet-400 rounded-full" />
      </div>

      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 dark:border-t-violet-300 animate-[spin_2.5s_linear_infinite]" />
        <div className="absolute inset-[8px] rounded-full border-4 border-transparent border-t-indigo-500 dark:border-t-violet-200 animate-[spin_1.6s_linear_infinite_reverse]" />
        <div className="absolute inset-[18px] rounded-full border-4 border-transparent border-t-indigo-400 dark:border-t-violet-100 animate-[spin_1s_linear_infinite]" />
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Generando Reporte
        </p>

        <p
          key={stepIndex}
          className="text-xs mt-1 text-indigo-600 dark:text-violet-300 animate-typewriter"
        >
          {STEPS[stepIndex]}
        </p>
      </div>

      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-500 ${
              i === stepIndex
                ? 'bg-indigo-600 dark:bg-violet-300 scale-125 animate-bounce-slow'
                : 'bg-slate-300 dark:bg-purple-700 scale-100'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
