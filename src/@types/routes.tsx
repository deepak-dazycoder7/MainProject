import { LayoutType } from './theme'
import type { LazyExoticComponent, ReactNode, ReactElement } from 'react'

export interface Meta {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    header?: string | ReactNode
    headerContainer?: boolean
    extraHeader?: LazyExoticComponent<() => JSX.Element>
    footer?: boolean
    layout?: LayoutType
}

export type Route = {
    key: string
    path: string
    component: LazyExoticComponent<<T extends Meta>(props: T) => ReactElement | null>
    authority: string[]
    meta?: Meta
}

export type Routes = Route[]
