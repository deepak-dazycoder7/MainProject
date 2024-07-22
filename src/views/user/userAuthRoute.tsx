import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

export const userAuthRoute: Routes = [
    {
        key: 'signIn',
        path: `user/profile/login`,
        component: lazy(() => import('@/views/user/auth/SignIn/SignIn')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/views/auth/SignUp')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@/views/auth/ForgotPassword')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/views/auth/ResetPassword')),
        authority: [],
    },
]

export default userAuthRoute
