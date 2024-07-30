import { useMemo, lazy, Suspense } from 'react'
import Loading from '@/components/shared/Loading'
import { useAppSelector } from '@/store'
import {
    LAYOUT_TYPE_CLASSIC,
    LAYOUT_TYPE_MODERN,
    LAYOUT_TYPE_SIMPLE,
    LAYOUT_TYPE_STACKED_SIDE,
    LAYOUT_TYPE_DECKED,
    LAYOUT_TYPE_BLANK,
} from '@/constants/theme.constant'
import authHook from '@/views/auth/auth.hook'
import useDirection from '@/utils/hooks/useDirection'
import useLocale from '@/utils/hooks/useLocale'

const layouts = {
    [LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
    [LAYOUT_TYPE_MODERN]: lazy(() => import('./ModernLayout')),
    [LAYOUT_TYPE_STACKED_SIDE]: lazy(() => import('./StackedSideLayout')),
    [LAYOUT_TYPE_SIMPLE]: lazy(() => import('./SimpleLayout')),
    [LAYOUT_TYPE_DECKED]: lazy(() => import('./DeckedLayout')),
    [LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
}

const Layout = () => {
    const layoutType = useAppSelector((state) => state.theme.layout.type)

    const { authenticated } = authHook()

    useDirection()

    useLocale()

    const AppLayout = useMemo(() => {
        if (authenticated) {
            return layouts[layoutType]
        }
        return lazy(() => import('./AuthLayout'))
    }, [layoutType, authenticated])

    return (
        <Suspense
            fallback={
                <div className="flex flex-auto flex-col h-[100vh]">
                    <Loading loading={true} />
                </div>
            }
        >
            <AppLayout />
        </Suspense>
    )
}

export default Layout


// import { useMemo, lazy, Suspense } from 'react'
// import Loading from '@/components/shared/Loading'
// import { useAppSelector } from '@/store'
// import {
//     LAYOUT_TYPE_CLASSIC,
//     LAYOUT_TYPE_MODERN,
//     LAYOUT_TYPE_SIMPLE,
//     LAYOUT_TYPE_STACKED_SIDE,
//     LAYOUT_TYPE_DECKED,
//     LAYOUT_TYPE_BLANK,
// } from '@/constants/theme.constant'
// import useDirection from '@/utils/hooks/useDirection'
// import useLocale from '@/utils/hooks/useLocale'
// import { publicRoutes } from '@/configs/routes.config'
// import { Link, useLocation } from 'react-router-dom';

// // Define the layout mappings
// const layouts = {
//     [LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
//     [LAYOUT_TYPE_MODERN]: lazy(() => import('./ModernLayout')),
//     [LAYOUT_TYPE_STACKED_SIDE]: lazy(() => import('./StackedSideLayout')),
//     [LAYOUT_TYPE_SIMPLE]: lazy(() => import('./SimpleLayout')),
//     [LAYOUT_TYPE_DECKED]: lazy(() => import('./DeckedLayout')),
//     [LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
// }

// const Layout = () => {
//     const layoutType = useAppSelector((state) => state.theme.layout.type)
//     const location = useLocation();
//     const currentPath = location.pathname;
//     // Use custom hooks
//     useDirection()
//     useLocale()
//     console.log(currentPath)
//     // Memoize the layout based on `layoutType`
//     const AppLayout = useMemo(() => {
//         if (publicRoutes.find(route => route.path === currentPath)) { 
//             return lazy(() => import('./AuthLayout'))
//         } else {
//                 return layouts[layoutType] || layouts[LAYOUT_TYPE_STACKED_SIDE] // Fallback to default layout if `layoutType` is invalid
//         }
//     }, [layoutType])

//     return (
//         <Suspense
//             fallback={
//                 <div className="flex flex-auto flex-col h-[100vh]">
//                     <Loading loading={true} />
//                 </div>
//             }
//         >
//             <AppLayout />
//         </Suspense>
//     )
// }

// export default Layout
