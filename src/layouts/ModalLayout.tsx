import React from 'react';
import { createPortal } from 'react-dom';
import { useModal, useTheme } from '../shared/hooks';
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
    width: string,
    children: React.ReactNode;
    className?: string,
}

export const ModalLayout: React.FC<ModalProps> = ({ width, children, className = '' }) => {
    const { onCloseModal } = useModal()
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return createPortal(
        <div
            className={`
                fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm
                ${isDark ? 'bg-gray-950/60' : 'bg-gray-800/40'}
            `}
            onClick={onCloseModal}
        >
            <div
                className={`
                    rounded-md shadow-xl p-6 mx-4 relative z-60 transition-colors duration-200
                    ${isDark ? 'bg-gray-800' : 'bg-white'}
                    ${width} ${className}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <header className='flex items-center justify-between mb-5'>
                    <div className="inline-block">
                        <img
                className="w-24 object-contain"
                            src={
                                !isDark
                                ? "https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png"
                                : "https://res.cloudinary.com/dlamufioy/image/upload/v1762972429/puntocom/PUNTOCAF%C3%89_3_njxbc4.png"
                            }
                            alt="Logo PuntoCom"
                        />
                    </div>
                    <button
                        onClick={onCloseModal}
                        className={`
                            transition-colors cursor-pointer
                            ${isDark 
                                ? 'text-gray-400 hover:text-gray-200' 
                                : 'text-gray-400 hover:text-gray-600'
                            }
                        `}
                    >
                        <IoCloseOutline size={30} />
                    </button>
                </header>

                {children}
            </div>
        </div>,
        document.body
    );
};