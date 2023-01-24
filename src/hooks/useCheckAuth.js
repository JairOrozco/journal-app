
//import react redux
import { useDispatch, useSelector } from "react-redux"

//import react hooks
import { useEffect } from "react"

//import firebase
import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../firebase/config"

//import auth
import { login, logout } from "../store/auth"

//import thunks de journal
import { startLoadignNotes } from "../store/journal"



export const useCheckAuth = () => {

    const { status } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    useEffect( () => {

        onAuthStateChanged( FirebaseAuth, async( user ) => {

            if( !user ) return dispatch( logout() )

            const { uid, email, displayName, photoURL } = user;

            dispatch( login( { uid, email, displayName, photoURL } ) );
            dispatch( startLoadignNotes() );

        })

    }, [] );

    return {
        status
    }
        
}
