import { combineReducers, AnyAction, Reducer, CombinedState } from '@reduxjs/toolkit'
import authReducer from '../views/auth/auth.slice'
import baseReducer, { BaseState } from './slices/base'
import localeReducer, { LocaleState } from './slices/locale/localeSlice'
import themeReducer, { ThemeState } from './slices/theme/themeSlice'
import RtkQueryService from '@/services/RtkQueryService'

export type RootState = CombinedState<{
    auth: ReturnType<typeof authReducer>
    base: BaseState
    locale: LocaleState
    theme: ThemeState
    [RtkQueryService.reducerPath]: ReturnType<typeof RtkQueryService.reducer>
}>

export interface AsyncReducers {
    [key: string]: Reducer<any, AnyAction>
}

const staticReducers = {
    auth: authReducer,
    base: baseReducer,
    locale: localeReducer,
    theme: themeReducer,
    [RtkQueryService.reducerPath]: RtkQueryService.reducer,
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
