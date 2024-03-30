import React from 'react';
import {Box, TextField} from '@mui/material';

type Props = {
    id:string,
    label:string,
    rows: number,
    maxRows: number,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void
}

export default function TextInputBox({id,label, value, rows, maxRows, onChange}:Props) {
    return (
        <Box 
            component="form"
            sx = {{
                '& > :not(style)' : {m:1, width: '25ch'}
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
                placeholder="e.g. Add a beachball in the foreground."
                rows = {rows}
                maxRows={maxRows}
            />
        </Box>

    );
}