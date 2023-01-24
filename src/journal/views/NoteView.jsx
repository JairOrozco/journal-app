//import material UI
import { DeleteOutline, Satellite, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'

//import componentes
import { ImageGallery } from '../components'

//import custom hooks
import { useForm } from '../../hooks/useForm'

//import react redux
import { useDispatch, useSelector } from 'react-redux'

//hooks de react
import { useEffect, useMemo, useRef } from 'react'

//import actions desde el journalSlice y thunks
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal/'

//import sweet alert 2
import Swal from 'sweetalert2'

//import css para sweet alert
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal )

    const dispatch = useDispatch()

    const { title, body, date, onInputChange, formState } = useForm( note )


    const dateString = useMemo( () => {

        const newDate = new Date( date )

        return newDate.toUTCString()

    }, [ date ]) 

    const fileInputRef = useRef()


    useEffect( () => {
        
        dispatch ( setActiveNote( formState ) )
        
    
    }, [ formState ])

    useEffect( () => {
        
        if( messageSaved.length > 0 ) { 
            Swal.fire('Nota actualizada', messageSaved, 'success' )
        }
        
    
    }, [ messageSaved ])
    

    const onSaveNote = () => {
        dispatch( startSavingNote() )
    }

    const onFileInputChange = ( e ) => {
        if( e.target.files === 0) return
        
        dispatch( startUploadingFiles( e.target.files ) )
    }

    const onDelete = () => {
        dispatch( startDeletingNote() )
    }

    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container
            direction='row'
            justifyContent='space-between'
            sx={ { mb: 1 } }
        >
            <Typography fontSize={ 39 } fontWeight='light'>
                { dateString }
            </Typography>

            <Grid item >

                <input 
                    style={ { display: 'none' } } 
                    type="file" multiple 
                    onChange={ onFileInputChange } 
                    ref={ fileInputRef } 
                />
                
                <IconButton color='primary' disabled={ isSaving } onClick={ () => fileInputRef.current.click() } >
                    <UploadOutlined/>
                </IconButton>

                <Button disabled={ isSaving } color='primary' sx={ { padding: 2 } } onClick={ onSaveNote } >
                    <SaveOutlined sx={ { fontSize: 30, mr: 1 } } />
                    Guardar
                </Button>
            </Grid>

            <Grid container>

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un título'
                    label='Título'
                    sx={ { border: 'none', mb: 1 } }
                    name= 'title'
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Qué sucedió hoy?'
                    minRows={ 5 }
                    name= 'body'
                    value={ body }
                    onChange={ onInputChange }
                />

            </Grid>

            <Grid container justifyContent='end' >
                <Button onClick={ onDelete } sx={ { mt: 2 } } color='error' >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={ note.imageUrls } />

        </Grid>
    )
}
