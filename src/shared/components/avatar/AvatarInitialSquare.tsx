import React from 'react'
import { motion } from "framer-motion";
import { getInitial } from '../../helpers/getInitial';

interface Props {
    name: string,
    className?: string
}

export const AvatarInitialSquare: React.FC<Props> = ({ name, className }) => {
    return (
        <motion.div
            className={`rounded-xl flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-3xl font-bold shadow ${className}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
        >
            {getInitial(name)}
        </motion.div>
    )
}
