export const USER_ROLE = {
    MEMBER: 'MEMBER',
    ADMIN: 'ADMIN'
} as const

export type TUserRole = keyof typeof USER_ROLE