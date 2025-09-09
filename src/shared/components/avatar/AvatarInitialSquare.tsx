import React from 'react'
import { motion } from "framer-motion";
import { getInitial } from '../../helpers/getInitial';

interface Props {
    name: string
}

export const AvatarInitialSquare: React.FC<Props> = ({ name }) => {
    return (
        <motion.div
            className="h-20 w-20 rounded-xl flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-4xl font-bold shadow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
        >
            {getInitial(name)}
        </motion.div>
    )
}
