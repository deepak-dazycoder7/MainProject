import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { userRoutes } from '@/views/user/user.routes'
import AuthRoute from '@/views/auth/auth.route'
import PropertyRoute from '@/views/property/property.route'

export const publicRoutes: Routes = [...AuthRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
...userRoutes,
...PropertyRoute
]