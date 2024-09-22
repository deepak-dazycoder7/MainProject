export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    message: string
    status: number
    data: {
        user: {
            id: number
            firstName: string
            lastName: string
            email: string
            role: string
            status: boolean
            created_by: string | null
            deleted_by: string | null
            avtar: string
        }
        token: string
    }
    error: boolean
}


export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
