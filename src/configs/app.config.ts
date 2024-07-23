export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}
const appConfig: AppConfig = {
    apiPrefix: 'http://localhost:5000', // Set your base API URL here
    authenticatedEntryPath: '',
    unAuthenticatedEntryPath: '',
    tourPath: '/',
    locale: 'en',
    enableMock: true,
}



export default appConfig; 
