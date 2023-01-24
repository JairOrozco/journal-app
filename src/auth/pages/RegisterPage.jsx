//import Icons de Material UI
import { AttachEmail, Google } from "@mui/icons-material";

//import Material UI Components
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";


//import react router
import { Link as RouterLink } from 'react-router-dom';

//import react hooks
import { useMemo, useState } from "react";

//import custom hooks
import { useForm } from "../../hooks";

//import componentes
import { AuthLayout } from "../layout/AuthLayout";

//react redux
import { useDispatch, useSelector } from "react-redux";

//thunks
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";



const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [ ( value ) => value.includes('@'), 'El correo debe de tener una @.' ],
    password: [ ( value ) => value.length >= 6, 'El password debe de tener más de 6 letras' ],
    displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio' ]
}

export const RegisterPage = () => {

    const dispatch = useDispatch()

    const [formSubmitted, setFormSubmitted] = useState( false )

    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => {
        status === 'checking'
    }, [ status ])

    const { 
        formState, displayName, email, password, onInputChange, 
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm( formData, formValidations );


    const onSubmit = (e) => {
        e.preventDefault()
        setFormSubmitted( true )

        if( !isFormValid ) return;

        dispatch( startCreatingUserWithEmailPassword( formState ) )
    }

    


    return (
        <AuthLayout title='Create account'>
            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                <Grid container >
                    <Grid 
                        item 
                        xs={ 12 } 
                        sx={ { mt: 2 } }>
                            <TextField
                                label='Name'
                                type='text'
                                placeholder='Your Name'
                                fullWidth
                                name="displayName"
                                value={ displayName }
                                onChange={ onInputChange }
                                error={ !!displayNameValid && formSubmitted }
                                helperText={ displayNameValid }
                            />
                    </Grid>
                    <Grid 
                        item 
                        xs={ 12 } 
                        sx={ { mt: 2 } }>
                            <TextField
                                label='E-mail'
                                type='email'
                                placeholder='example@google.com'
                                fullWidth
                                name="email"
                                value={ email }
                                onChange={ onInputChange }
                                error={ !!emailValid && formSubmitted }
                                helperText={ emailValid }
                            />
                    </Grid>
                    <Grid 
                        item xs={ 12 } 
                        sx={ { mt: 2 } }>
                            <TextField
                                label='Password'
                                type='password'
                                placeholder='password'
                                fullWidth
                                name="password"
                                value={ password }
                                onChange={ onInputChange }
                                error={ !!passwordValid && formSubmitted }
                                helperText={ passwordValid }
                            />
                    </Grid>
                    <Grid
                        container
                        spacing={ 2 }
                        sx={ { mb:2, mt:1 } }
                    >
                        <Grid
                            item
                            xs={ 12 }
                            display={ !!errorMessage ? '' : 'none' }
                        >
                            <Alert
                                severity="error"
                            >
                                { errorMessage }
                            </Alert>
                        </Grid>

                        <Grid
                            item
                            xs={ 12 }
                        >
                            <Button
                                disabled={ isCheckingAuthentication }
                                variant="contained"
                                fullWidth
                                type='submit'
                            >
                                Create account
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction='row'
                        justifyContent='end'
                    >
                        <Typography
                            sx={ { mr:1 } }
                        >
                            Do you alredy have an account?
                        </Typography>
                        <Link
                            component={ RouterLink }
                            color='inherit'
                            to='/auth/login'
                        >
                            Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>

    )
}
