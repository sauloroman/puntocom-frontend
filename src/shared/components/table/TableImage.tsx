interface TableImageProps {
    width: string,
    text: string,
    icon: string,
    initial?: string,
}

export const TableImage: React.FC<TableImageProps> = ({ width, text, icon, initial }) => {
    return (
        <div className={`flex items-center justify-center w-8 h-8 ${width}`}>
            {
                icon !== text
                ? (
                    <img 
                        className={`object-cover w-full h-full rounded-full ${width}`} 
                        src={icon} 
                        alt="Imagen en tabla" 
                    />
                )
                : (
                    <div className={`text-lg font-semibold w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center`}>
                        {initial}
                    </div>
                )
            }
        </div>
    )
}
