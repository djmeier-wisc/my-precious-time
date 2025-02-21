import {MenuItem, Typography} from "@mui/material";
import Link from "next/link";

export default function CustomMenuItem({handleCloseNavMenu, url, name}) {
    return (
        <MenuItem key={name} onClick={handleCloseNavMenu}>
            <Link href={url}>
                <Typography textAlign="center">{name}</Typography>
            </Link>
        </MenuItem>
    );
}