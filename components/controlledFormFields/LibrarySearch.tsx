import React from 'react';
import { Box, Stack, InputBase, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

// Library Search Component.   
// Library contains creative assets that are composed to form ads including
//   - background images
//   - object images
//   - active widgets (for html5 dynamic ads)
// The search component can be initialized to search just one of these types (as in the background or object designer UX) of all of them (as in the ad design UX).

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 0),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

type Props = {
    assetTypeFilter: "None" | "Backgrounds" | "Objects" | "Widgets"
}

export default function LibrarySearch({ assetTypeFilter }: Props) {
    return (
        <Stack direction="row">
            <Box sx={{ border: 2, p: 1, flexGrow: 1, borderColor: 'motionPoint.borders' }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search Library…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Box>
            <Button sx = {{ml:1}} variant = "contained" color = "secondary">Show All</Button>
        </Stack>
    );
}