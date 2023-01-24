// import actions desde el slice de auth
import { checkingCredentials, login, logout } from "./authSlice"

//Trayendo funcion de inicio de sesion con google y firebase
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"

// import actions desde el slice de journal
import { clearNotesLogout } from "../journal"




export const checkingAuthentication = ( email, password ) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )
    }

}

export const startGoogleSignIn = () => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const result = await signInWithGoogle()

        if( !result.ok ) {
            return dispatch( logout( result.errorMessage ) )
        }

        dispatch( login( result ) )

        // console.log( { result } )

    }
    
}

export const startCreatingUserWithEmailPassword = ( { email, password, displayName }) => {
    return async( dispatch ) => {
        
        dispatch( checkingCredentials() )

        const {ok, uid, photoURL } = await registerUserWithEmailPassword( { email, password, displayName } )
        
        if( !ok ) return dispatch( logout( { errorMessage } ) )

        dispatch( login( { uid, displayName, email, photoURL } ) )
    }
}

export const startLoginWithEmailPassword = ( { email, password } ) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const result = await loginWithEmailPassword( { email, password } )

        if( !result.ok ) return dispatch( logout( result ) )

        dispatch( login( result ) )
    } 
}

export const startLogout = () => { 

    return async ( dispatch ) => {

        await logoutFirebase();
        
        dispatch( clearNotesLogout() )

        dispatch( logout() );
        
    }
}
