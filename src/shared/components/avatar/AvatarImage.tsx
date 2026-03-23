import React from 'react'
import { motion } from 'framer-motion'

interface Props {
    image: string,
    alt: string,
    className?: string
}

export const AvatarImage: React.FC<Props> = ({ image, alt, className }) => {
    return (
        <motion.div
            className={`rounded-xl overflow-hidden flex items-center justify-center ${className}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
        >
            <img src={image} alt={alt} className="h-full w-full object-cover" />
        </motion.div>
    )
}
