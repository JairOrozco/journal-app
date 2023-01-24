//import material ui
import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

//import react hooks
import { useMemo } from 'react'


//import action desde journal slice
import { setActiveNote } from '../../store/journal/journalSlice'

//import react redux 
import { useDispatch } from 'react-redux'


export const SideBarItem = ( { title = '', body, id, date, imageUrls = [] } ) => {

    const dispatch = useDispatch()

    const newTitle = useMemo( () => {
        return title.length > 17
            ?   title.substring(0,17) + '...'
            :   title;
    }, [ title ])

    const activeNote = () => {
        dispatch( setActiveNote( { title, body, id, date, imageUrls } ) )
    }


    return (
        <ListItem
            disablePadding
        >
            <ListItemButton
                onClick={ activeNote }
            >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid
                    container
                >
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
