//material UI
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'

//import components
import { SideBarItem } from './'

//react redux
import { useSelector } from 'react-redux'



export const SideBar = ( { drawerWidth } ) => {

    const { displayName } = useSelector( state => state.auth )
    const { notes } = useSelector( state => state.journal )

    return (
        <Box
            component='nav'
            sx={ { width: { sm: drawerWidth }, flexShrink: { sm: 0 } } }
        > 
            <Drawer
                variant='permanent' //temporary
                open={ true }
                sx={ { 
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                } }
            >
                <Toolbar>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                    >
                        { displayName }
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map( note => (
                            <SideBarItem 
                                key={ note.id }
                                { ...note }
                            />
                        ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
