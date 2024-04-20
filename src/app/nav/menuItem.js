import { MenuItem, Typography } from "@mui/material";

export default function CustomMenuItem({ handleCloseNavMenu, url, name }) {
    return (
        <MenuItem key={name} onClick={handleCloseNavMenu}>
            <a href={url}>
                <Typography textAlign="center">{name}</Typography>
            </a>
        </MenuItem>
    );
}