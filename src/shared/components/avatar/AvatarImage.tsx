import React from 'react'
import { motion } from 'framer-motion'

interface Props {
    image: string,
    alt: string,
}

export const AvatarImage: React.FC<Props> = ({ image, alt }) => {
    return (
        <motion.div
            className="h-20 w-20 rounded-xl overflow-hidden flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
        >
            <img src={image} alt={alt} className="h-full w-full object-cover" />
        </motion.div>
    )
}
