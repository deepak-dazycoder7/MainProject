import { Navigate, Outlet } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import authHook from '@/views/auth/auth.hook'

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {
    const { authenticated } = authHook()

    return authenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />
}

export default PublicRoute
