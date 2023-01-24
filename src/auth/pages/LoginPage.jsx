//import react hooks
import { useMemo } from "react";

//import Icons de Material UI
import { Google } from "@mui/icons-material";

//import Material UI Components
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";

//import react router
import { Link as RouterLink } from 'react-router-dom';

//import componentes
import { AuthLayout } from "../layout/AuthLayout";

//import custom hooks
import { useForm } from "../../hooks/";

//thunks
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";

//import redux
import { useDispatch, useSelector } from "react-redux";


const formData = {
    email: '',
    password: ''
}


export const LoginPage = () => {

    const { status, errorMessage } = useSelector( state => state.auth )

    const dispatch = useDispatch();

    const { email, password, onInputChange, formState } = useForm( formData )


    const isAuthenticating = useMemo( () => status === 'checking', [ status ] )


    const onSubmit = (e) => { 
        e.preventDefault();

        dispatch( startLoginWithEmailPassword( { email, password } ) )
    }

    const onGoogleSingIn = () => {

        dispatch( startGoogleSignIn() )
    }

    

    return (
        <AuthLayout title='Login'>

            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">

                <Grid container >

                    <Grid item xs={ 12 } sx={ { mt: 2 } }>
                        <TextField
                            label='E-mail'
                            type='email'
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                            placeholder='example@google.com'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={ { mt: 2 } }>
                        <TextField
                            label='Password'
                            type='password'
                            name="password"
                            value={ password }
                            onChange={ onInputChange }
                            placeholder='password'
                            fullWidth
                        />
                    </Grid>

                    <Grid container>
                        <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' } sx={ { mt: 1 } } >
                            <Alert severity="error">
                                { errorMessage }
                            </Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing={ 2 } sx={ { mb:2, mt:1 } } >

                        <Grid item xs={ 12 } sm={ 6 } >
                            <Button variant="contained" fullWidth type="submit" disabled={ isAuthenticating } >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 } >
                            <Button variant="contained" fullWidth onClick={ onGoogleSingIn } disabled={ isAuthenticating } >
                                <Google />
                                <Typography sx={ { ml:1 } } >
                                    Google
                                </Typography>
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end' >
                        <Link component={ RouterLink } color='inherit' to='/auth/register' >
                            Create an account
                        </Link>
                    </Grid>

                </Grid>

            </form>

        </AuthLayout>

    )
}
