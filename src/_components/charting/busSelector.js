'use client'
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, useTheme } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(currSelection, allSelectionList, theme) {
    return {
        fontWeight:
            allSelectionList.indexOf(currSelection) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
};

export default function MultiListSelect({ busOptions, setCurrBusList, currBusList }) {
    const theme = useTheme();
    let handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCurrBusList(typeof value === 'string' ? value.split(',') : value);
    }
    return (
        <FormControl className="w-full">
            <InputLabel id="demo-multiple-name-label">Select Route(s)</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={currBusList}
                onChange={handleChange}
                input={<OutlinedInput label="Select Routes" />}
                MenuProps={MenuProps}
            >
                {busOptions && busOptions?.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, currBusList, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}