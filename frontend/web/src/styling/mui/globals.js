import { createTheme } from '@mui/material' 

import { colors, spacing } from '../globals/tokens.js'

export default function InitMui() {
    return createTheme({
    palette: {
        primary: {
        main: colors.color2,
        },
        secondary: {
        main: colors.color3,
        },
        background: {
        default: colors.color1,
        }
    },
    spacing: (factor) => `${factor * parseFloat(spacing.container)}px`,
    });
}