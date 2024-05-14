import React from 'react';
import { Divider, Box, Typography, List, ListItem, ListSubheader, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';

import { useTheme } from '@emotion/react';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import AnimationIcon from '@mui/icons-material/Animation';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import CampaignIcon from '@mui/icons-material/Campaign';
import PublishIcon from '@mui/icons-material/Publish';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsightsIcon from '@mui/icons-material/Insights';
import { useRouter } from 'next/navigation'

const drawerWidth = 300;
function NavDrawer() {
    const router = useRouter();
    const theme = useTheme();

    const menuStructure =
        [
            {
                sectionTitle: "Visual Elements",
                elements: [
                    { label: 'Backgrounds', path: '/design/bg', icon: <WallpaperIcon /> },
                    { label: 'Objects', path: '/design/obj', icon: <AutoAwesomeIcon /> },
                ]
            },
            {
                sectionTitle: "Ads",
                elements: [
                    { label: 'Static Ads', path: '/design/static', icon: <CropOriginalIcon /> },
                    { label: 'Dynamic Web Ads', path: '/design/dynamic', icon: <AnimationIcon /> },
                    { label: 'Social Posts', path: '/design/social', icon: <ConnectWithoutContactIcon /> },
                ]
            },
            {
                sectionTitle: "Campaigns",
                elements: [
                    { label: 'Define', path: '/campaigns/define', icon: <CampaignIcon /> },
                    { label: 'Deploy', path: '/campaigns/deploy', icon: <PublishIcon /> },
                ]
            },
            {
                sectionTitle: "Performance",
                elements: [
                    { label: 'Analytics', path: '/monitor/analytics', icon: <InsightsIcon /> },
                    { label: 'Calendar', path: '/monitor/calendar', icon: <CalendarMonthIcon /> },
                ]
            },
        ];
    // <Drawer
    //     variant="permanent"
    //     sx={{
    //         width: drawerWidth,
    //         flexShrink: 0,
    //         [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    //     }}
    // >


    const renderAppTitleBar = () => (
        <Box display="flex" py={1} justifyContent="center" key="apptitle" sx={{ bgcolor: "motionPoint.main", width:"100%" }}>
            <Box sx={{ mr: 1, marginTop: "3px" }}>
                <img width="26" height="26" src="/images/mplogo.png" />
            </Box>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    textDecoration: 'none',
                    color: "motionPoint.contrastText",
                }}
            >
                AdComposer
            </Typography>
        </Box>
    );

    const renderNavMenu = () => (
        <Box sx={{ flexGrow:1, borderRight: 2, borderBottom: 2, p:0, m:0, bgColor: "motionPoint.appBackground", borderColor: 'motionPoint.borders' }}>
            <Box sx={{ overflow: 'auto' }}>
                <Box key="menuItems"
                    sx={(theme) => ({
                        bgcolor: "motionPoint.appBackground"
                    })}
                >
                    {menuStructure.map((section, sectionIx) => (
                        <React.Fragment key={`section-${sectionIx}`}>
                            {(sectionIx > 0) && <Divider/>}
                            <List
                                sx={{ width: '100%', maxWidth: 240 }}
                                component="nav"
                                aria-labelledby={`list-subheader-${sectionIx}`}
                                subheader={
                                    <ListSubheader
                                        id={`list-subheader-${sectionIx}`}
                                        component="div"
                                        sx={(theme) => ({ fontWeight: "bold", color: theme.palette.text.primary, bgcolor: "motionPoint.appBackground" })}
                                    >
                                        {section.sectionTitle}
                                    </ListSubheader>
                                }>

                                {section.elements.map((item, itemIndex) => (
                                    <ListItem disablePadding
                                        key={`item-${sectionIx}-${itemIndex}}`
                                    }
                                    >
                                        <ListItemButton onClick={() => router.push(item.path)} sx = {{bgcolor: "motionPoint.appBackground"}}>
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.label}  />
                                        </ListItemButton>
                                    </ListItem>
                                ))}

                            </List>
                        </React.Fragment>
                    ))
                    }
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ bgcolor:"motionPoint.appBackground", border:0, display: "flex", flexDirection: "column", width:drawerWidth }}>
            {renderAppTitleBar()}
            {renderNavMenu()}
        </Box>

    );
}

export default NavDrawer;