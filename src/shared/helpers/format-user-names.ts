import type { User } from "../../interfaces/dto/user.interface";

export const formatUserNames = ( users: User[] ) => {
    const userNames = users?.map(user => `${user.name} ${user.lastname}`) ?? []
    return userNames
}

export const getUserByFormattedName = ( users: User[], userNameFormatted: string ): User | null => {
    const user = users?.find(user => `${user.name} ${user.lastname}` === userNameFormatted)
    if (!user) return null
    return user
}