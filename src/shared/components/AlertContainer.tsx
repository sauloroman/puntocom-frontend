import React, { useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useAlert } from '../hooks'
import { Alert } from './Alert'
import { IoMdClose } from "react-icons/io";

export const AlertContainer: React.FC = () => {
  const { isVisible, text, title, type, hideAlert } = useAlert()

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideAlert()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, hideAlert])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="alert"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-5 right-5 z-50 max-w-sm w-full"
        >
          <div className="relative">
            <Alert
              type={type}
              title={title!}
              text={text!}
              className="shadow-lg"
            />
            <button
              onClick={hideAlert}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
