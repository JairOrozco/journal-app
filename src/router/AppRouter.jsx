// import react router
import { Navigate, Route, Routes } from "react-router-dom"

//import componentes
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { CheckingAuth } from "../ui/components/CheckingAuth"

//import custom hooks
import { useCheckAuth } from "../hooks/useCheckAuth"




export const AppRouter = () => {

    const { status } = useCheckAuth();

    if( status === 'checking' ) { 
        return <CheckingAuth />
    }


    return (
        <>
            <Routes>

                {
                    (status === 'authenticated')
                            /* Ruta de aplicación */
                        ?   <Route path="/*" element={ <JournalRoutes /> } />
                           /* Ruta de autenticación */
                        :   <Route path="/auth/*" element={ <AuthRoutes /> } />
                }

                <Route path="/*" element={ <Navigate to='/auth/login' /> } />


            </Routes>
        </>
    )
}
