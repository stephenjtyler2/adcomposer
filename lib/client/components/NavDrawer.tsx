import React from 'react';
import { Divider, Drawer, Box, Typography, List, ListItem, ListSubheader, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useTheme } from '@emotion/react';
import MailIcon from '@mui/icons-material/Mail';
import { useRouter } from 'next/navigation'

const drawerWidth = 240;
function NavDrawer() {
    const router = useRouter();
    const theme = useTheme();

    const menuStructure =
        [
            {
                sectionTitle: "Visual Elements Design",
                elements: [
                    { label: 'Backgrounds', path: '/design/bg' },
                    { label: 'Objects', path: '/design/obj' },
                ]
            },
            {
                sectionTitle: "Ad Design",
                elements: [
                    { label: 'Static Images', path: '/design/static' },
                    { label: 'Dynamic Web Ads', path: '/design/dynamic' },
                    { label: 'Social Posts', path: '/design/dynamic' },
                ]
            },
            {
                sectionTitle: "Create Campaigns",
                elements: [
                    { label: 'Define', path: '/campaigns/define' },
                    { label: 'Deploy', path: '/campaigns/deploy' },
                ]
            },
            {
                sectionTitle: "Monitor Performance",
                elements: [
                    { label: 'Analytics', path: '/monitor/analytics' },
                    { label: 'Calendar', path: '/monitor/calendar' },
                ]
            },
        ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >

            <Box sx={{ overflow: 'auto' }}>
                <Box display="flex" py={1} justifyContent="center" key="apptitle" sx = {(theme)=>({bgcolor: theme.palette.primary.main})}>
                    <Box sx = {{mr:1, marginTop:"3px"}}>
                        <img width = "26" height="26" src="/images/mplogo.png"/>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={(theme) => ({
                            display: { xs: 'none', md: 'flex' },
                            textDecoration: 'none',
                            color: "#eeeeee",
                        })}
                    >
                        AdComposer
                    </Typography>

                </Box>
                <Box key="menuItems" 
                    sx = {(theme)=>({
                        bgcolor: '#ffffff'
                    })}
                >

                    {menuStructure.map((section, sectionIx) => (
                        <React.Fragment key={`section-${sectionIx}`}>
                            {(sectionIx > 0) && <Divider />}
                            <List
                                sx={{ width: '100%', maxWidth: 240}}
                                component="nav"
                                aria-labelledby={`list-subheader-${sectionIx}`}
                                subheader={
                                    <ListSubheader 
                                        id={`list-subheader-${sectionIx}`}
                                        component="div" 
                                        sx = {(theme)=>({color: theme.palette.text.primary})}
                                        >
                                            {section.sectionTitle}
                                    </ListSubheader>
                                }>

                                {section.elements.map((item, itemIndex) => (
                                    <ListItem disablePadding
                                        key={`item-${sectionIx}-${itemIndex}}`}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {itemIndex % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={item.label} onClick={() => router.push(item.path)} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}

                            </List>
                        </React.Fragment>
                    ))
                    }
                </Box>

            </Box>
        </Drawer>
    );
}

export default NavDrawer;