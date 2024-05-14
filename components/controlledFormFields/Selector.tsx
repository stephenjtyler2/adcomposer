import React, { ReactNode } from 'react';
import { Typography, Box, Select, FormControl, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';

export interface SelectorOption {
    optionLabel: string,
    optionValue: string,
}

type Props = {
    type: "dropdown" | "radio";
    label: string,
    instanceTag: string,
    options: SelectorOption[],
    value: string,
    onSelectionChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

export default function Selector(props: Props) {
    const { type, value, label, instanceTag, options, onSelectionChange } = props;


    if (!options || options.length == 0) return (
        <Typography variant="body2">Invalid Options List</Typography>
    );

    const renderDropdown = () => (
        <Box key = {`selector-div-${instanceTag}`} sx = {{width:"100%"}}>
            <FormControl variant="standard" sx={{ mr: 1,my:1, minWidth: 12, width:"100%" }}>
                <InputLabel id={`selector-label-${instanceTag}`}>{label}</InputLabel>
                <Select
                    labelId={`selector-label-${instanceTag}`}
                    id={`id-${instanceTag}`}
                    value={value}
                    onChange={onSelectionChange}
                    label={label}
                >
                    {options.map((option) => (
                        <MenuItem 
                            key = {`option-${instanceTag}-${option.optionValue}`}
                            value={option.optionValue}
                            selected={option.optionValue == value}
                            >
                            {option.optionLabel}
                        </MenuItem>

                    ))}
                </Select>
            </FormControl>
        </Box>
    );

    const renderRadio = () => (
        <Box>
            <Typography variant="body1">Radio Selector Not Implemented Yet</Typography>
        </Box>
    );

    return (type == "dropdown") ? renderDropdown() : renderRadio();

}