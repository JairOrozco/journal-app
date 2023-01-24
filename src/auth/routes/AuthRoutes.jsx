// import de react router
import { Navigate, Route, Routes } from "react-router-dom"

//import de componentes
import { LoginPage, RegisterPage } from '../pages'


export const AuthRoutes = () => {
    return (
        <>
            <Routes>

                {/* Ruta de login */}
                <Route path="login" element={ <LoginPage/> } />

                {/* Ruta de register */}
                <Route path="register" element={ <RegisterPage/> } />

                <Route path="/*" element={ <Navigate to='/auth/login' /> } />

            </Routes>
        </>
    )
}
