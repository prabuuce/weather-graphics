import { createTheme } from '@mui/material/styles'
import { extendTheme as extendJoyTheme } from '@mui/joy/styles'

import { colors, spacing, radius, sizing, fonts } from '../globals/tokens.js'

export function InitMui() {
    return createTheme({
        palette: {
            primary: {
                main: colors.color3,
            },
            secondary: {
                main: colors.color4,
            },
            background: {
                default: colors.color1,
                paper: 'rgba(0, 0, 0, 0)',
            },
            text: {
                primary: colors.text,
                secondary: colors.secondaryText,
            },
        },
        typography: {
            fontFamily: fonts.fontFamily,
        },
        shape: {
            borderRadius: parseFloat(radius.container),
        },
        spacing: (factor) => `${factor * parseFloat(spacing.container)}px`,
        container: {
            background: 'rgba(0, 0, 0, 0)',
            borderColor: colors.color3,
            borderStyle: 'solid',
            borderWidth: sizing.borderWidth,
            borderRadius: radius.container,
            padding: spacing.containerPadding,
            margin: spacing.container,
        },
    });
}

export function InitJoy() {
    return extendJoyTheme({
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        solidBg: colors.color3,
                        solidHoverBg: colors.color4,
                    },
                    background: {
                        body: colors.color1,
                        surface: 'rgba(0, 0, 0, 0)',
                    },
                    text: {
                        primary: colors.text,
                        secondary: colors.secondaryText,
                    },
                },
            },
        },
        fontFamily: {
            body: fonts.fontFamily,
        },
        radius: {
            md: radius.container,
        },
        container: {
            background: 'rgba(0, 0, 0, 0)',
            borderColor: colors.color3,
            borderStyle: 'solid',
            borderWidth: sizing.borderWidth,
            borderRadius: radius.container,
            padding: spacing.containerPadding,
            margin: spacing.container,
        },
    })
}

export default InitMui;