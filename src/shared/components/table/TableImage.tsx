interface TableImageProps {
    width: string,
    text: string,
    icon: string
}

export const TableImage: React.FC<TableImageProps> = ({ width, text, icon }) => {
    return (
        <div>
            {
                icon !== text
                ? <img className={`${width}`} src={icon} alt="ícono de categoría" />
                : null
            }
        </div>
    )
}