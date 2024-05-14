import React from 'react';
import {Box, TextField} from '@mui/material';

type Props = {
    id:string,
    label:string,
    rows: number,
    placeholder: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void
}

export default function TextInputBox({id,label, placeholder, value, rows, onChange}:Props) {
    return (
        <Box 
            component="form"
            sx = {{
                '& > :not(style)' : {p:0,mt:2}
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id={`textinputbox-${id}`}
                label = {label}
                value = {value}
                onChange={onChange}
                multiline
                placeholder={placeholder}
                fullWidth ={true}
                rows = {rows}
            />
        </Box>

    );
}