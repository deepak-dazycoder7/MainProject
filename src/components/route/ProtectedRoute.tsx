import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import authHook from '@/views/auth/auth.hook'

const { unAuthenticatedEntryPath } = appConfig

const ProtectedRoute = () => {
    const { authenticated } = authHook()

    const location = useLocation()

    if (!authenticated) {
        return (
            <Navigate
                replace
                 to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
        
            />
        )
    }

    return <Outlet />
}

export default ProtectedRoute
