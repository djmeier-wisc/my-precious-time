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
    if(!allSelectionList) {
        return {}
    }
    return {
        fontWeight:
            allSelectionList !== currSelection
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
};

export default function SingleListSelect({ options, setCurrSelection, currSelection, labelName}) {
    const theme = useTheme();
    let handleChange = (event) => {
        setCurrSelection(event.target.value);
    }
    return (
        <FormControl className="w-full">
            <InputLabel style={{color: "rgb(241 245 249 / var(--tw-text-opacity))"}}>{labelName}</InputLabel>
            <Select
                value={currSelection}
                onChange={handleChange}
                input={<OutlinedInput label={labelName} />}
                MenuProps={MenuProps}
                style={{zIndex: 50}}
            >
                {options && options?.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, currSelection, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}