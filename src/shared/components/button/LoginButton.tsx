import React from 'react'
import { useTheme } from '../../hooks';
import { Button } from './'
import { RiLoginBoxLine } from 'react-icons/ri';

interface Props {
    text: string,
    submit?: boolean,
    className?: string,
    disabled?: boolean,
    onClick?: () => void
}

export const LoginButton: React.FC<Props> = ({
    text,
    submit = false,
    className = '',
    disabled = false,
    onClick = () => { }
}) => {

    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            type={submit ? "submit" : "button"}
            className={`
                text-sm flex items-center gap-2 justify-center cursor-pointer
                bg-[linear-gradient(to_right,#5f72bd_0%,#9b23ea_51%,#5f72bd_100%)]
                bg-[length:200%_auto] hover:bg-[position:right_center]
                transition-all duration-500 text-white rounded-full
                shadow-[0_0_15px_rgba(75,108,183,0.45)]
                ${isDark 
                    ? "hover:shadow-[0_0_20px_rgba(75,108,183,0.65)]"
                    : "hover:shadow-[0_0_20px_rgba(75,108,183,0.5)]"
                }
                ${className}
            `}
        >
            <RiLoginBoxLine size={15} />
            <p>{text}</p>
        </Button>
    )
}
