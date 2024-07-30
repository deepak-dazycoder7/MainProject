import { combineReducers, AnyAction, Reducer, CombinedState } from '@reduxjs/toolkit'
import authReducer from '../views/auth/auth.slice'
import userReducer from '../views/user/user.slice'
import baseReducer, { BaseState } from './slices/base'
import localeReducer, { LocaleState } from './slices/locale/localeSlice'
import themeReducer, { ThemeState } from './slices/theme/themeSlice'


export type RootState = CombinedState<{
    user: ReturnType<typeof userReducer>,
    auth: ReturnType<typeof authReducer>,
    base: BaseState,
    locale: LocaleState,
    theme: ThemeState,

}>

export interface AsyncReducers {
    [key: string]: Reducer<any, AnyAction>
}

const staticReducers = {
    user: userReducer,
    auth: authReducer,
    base: baseReducer,
    locale: localeReducer,
    theme: themeReducer,

}

const createRootReducer = (asyncReducers?: AsyncReducers): Reducer<RootState, AnyAction> => {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    })
}

const rootReducer = (asyncReducers?: AsyncReducers): Reducer<RootState, AnyAction> => {
    const combinedReducer = createRootReducer(asyncReducers)
    return (state: RootState | undefined, action: AnyAction) => {
        return combinedReducer(state, action)
    }
}

export default rootReducer
