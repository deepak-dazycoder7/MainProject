import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

export const PropertyRoute: Routes = [
     {
        key: 'property.propertyNew',
        path: '/property/property-new',
        component: lazy(() => import('@/views/property/PropertyNew/PropertyNew')),
        authority: [],
        meta: {
            header: 'Add New Property',
        },
    },
]

export default PropertyRoute
