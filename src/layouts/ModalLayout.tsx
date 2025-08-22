import React from 'react';
import { createPortal } from 'react-dom';
import { useModal } from '../shared/hooks';
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
    width: string,
    children: React.ReactNode;
}

export const ModalLayout: React.FC<ModalProps> = ({ width, children }) => {

    const { onCloseModal } = useModal()

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/40 backdrop-blur-sm"
            onClick={onCloseModal}
        >
            <div
                className={`bg-white rounded-md shadow-xl p-6 ${width} mx-4 relative z-60`}
                onClick={(e) => e.stopPropagation()}
            >
                <header className='flex items-center justify-between mb-5'>
                    <div className="inline-block">
                        <img
                            className="w-25 mix-blend-multiply"
                            src="https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png"
                            alt="Logo PuntoCom"
                        />
                    </div>
                    <button
                        onClick={onCloseModal}
                        className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
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
