import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

export const PropertyRoute: Routes = [
    {
        key: 'propertyCreate',
        path: `/property-create`,
        component: lazy(() => import('@/views/property/PorpertyCreate/property.create.form')),
        authority: [],
    },
 
]

export default PropertyRoute
