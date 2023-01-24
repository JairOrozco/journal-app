
//import react router
import { Navigate, Route, Routes } from 'react-router-dom'

// import componentes
import { JournalPage } from '../pages/JournalPage'

export const JournalRoutes = () => {
    return (
        <>
            <Routes>

                <Route path='/' element={ <JournalPage/> } />

                <Route path='/*' element={ <Navigate to='/' /> } />

            </Routes>
        </>
    )
}
