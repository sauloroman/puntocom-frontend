import { AvatarInitial } from "../avatar/AvatarInitial"

interface TableImageProps {
    width: string,
    text: string,
    icon: string,
    initial?: string,
}

export const TableImage: React.FC<TableImageProps> = ({ width, text, icon, initial }) => {
    console.log({icon, text})
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
                   <AvatarInitial initial={ initial ?? '' } />
                )
            }
        </div>
    )
}
