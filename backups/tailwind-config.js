const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {

        },
    },
    plugins: [],
    darkMode: "class",
    plugins: [heroui(
        {
            "themes": {
                "light": {
                    "colors": {
                        "default": {
                            "50": "#fafafa",
                            "100": "#f2f2f3",
                            "200": "#ebebec",
                            "300": "#e3e3e6",
                            "400": "#dcdcdf",
                            "500": "#d4d4d8",
                            "600": "#afafb2",
                            "700": "#8a8a8c",
                            "800": "#656567",
                            "900": "#404041",
                            "foreground": "#000",
                            "DEFAULT": "#d4d4d8"
                        },
                        "primary": {
                            "50": "#e5ecee",
                            "100": "#bfd1d6",
                            "200": "#9ab7be",
                            "300": "#759ca7",
                            "400": "#50828f",
                            "500": "#2b6777",
                            "600": "#235562",
                            "700": "#1c434d",
                            "800": "#143139",
                            "900": "#0d1f24",
                            "foreground": "#fff",
                            "DEFAULT": "#2b6777"
                        },
                        "secondary": {
                            "50": "#e9f5f2",
                            "100": "#cbe6e0",
                            "200": "#add7ce",
                            "300": "#8fc8bc",
                            "400": "#70baaa",
                            "500": "#52ab98",
                            "600": "#448d7d",
                            "700": "#356f63",
                            "800": "#275148",
                            "900": "#19332e",
                            "foreground": "#000",
                            "DEFAULT": "#52ab98"
                        },
                        "success": {
                            "50": "#e9f5f2",
                            "100": "#cbe6e0",
                            "200": "#add7ce",
                            "300": "#8fc8bc",
                            "400": "#70baaa",
                            "500": "#52ab98",
                            "600": "#448d7d",
                            "700": "#356f63",
                            "800": "#275148",
                            "900": "#19332e",
                            "foreground": "#000",
                            "DEFAULT": "#52ab98"
                        },
                        "warning": {
                            "50": "#fef6df",
                            "100": "#fce9b3",
                            "200": "#fadb86",
                            "300": "#f8ce59",
                            "400": "#f6c12d",
                            "500": "#f4b400",
                            "600": "#c99500",
                            "700": "#9f7500",
                            "800": "#745600",
                            "900": "#493600",
                            "foreground": "#000",
                            "DEFAULT": "#f4b400"
                        },
                        "danger": {
                            "50": "#faeae9",
                            "100": "#f4cbca",
                            "200": "#edadab",
                            "300": "#e68f8d",
                            "400": "#e0716e",
                            "500": "#d9534f",
                            "600": "#b34441",
                            "700": "#8d3633",
                            "800": "#672726",
                            "900": "#411918",
                            "foreground": "#000",
                            "DEFAULT": "#d9534f"
                        },
                        "background": "#ffffff",
                        "foreground": "#000000",
                        "content1": {
                            "DEFAULT": "#ffffff",
                            "foreground": "#000"
                        },
                        "content2": {
                            "DEFAULT": "#f4f4f5",
                            "foreground": "#000"
                        },
                        "content3": {
                            "DEFAULT": "#e4e4e7",
                            "foreground": "#000"
                        },
                        "content4": {
                            "DEFAULT": "#d4d4d8",
                            "foreground": "#000"
                        },
                        "focus": "#2b6777",
                        "overlay": "#000000"
                    }
                },
                "dark": {
                    "colors": {
                        "default": {
                            "50": "#0d0d0e",
                            "100": "#19191c",
                            "200": "#26262a",
                            "300": "#323238",
                            "400": "#3f3f46",
                            "500": "#65656b",
                            "600": "#8c8c90",
                            "700": "#b2b2b5",
                            "800": "#d9d9da",
                            "900": "#ffffff",
                            "foreground": "#fff",
                            "DEFAULT": "#3f3f46"
                        },
                        "primary": {
                            "50": "#0d1f24",
                            "100": "#143139",
                            "200": "#1c434d",
                            "300": "#235562",
                            "400": "#2b6777",
                            "500": "#50828f",
                            "600": "#759ca7",
                            "700": "#9ab7be",
                            "800": "#bfd1d6",
                            "900": "#e5ecee",
                            "foreground": "#fff",
                            "DEFAULT": "#2b6777"
                        },
                        "secondary": {
                            "50": "#19332e",
                            "100": "#275148",
                            "200": "#356f63",
                            "300": "#448d7d",
                            "400": "#52ab98",
                            "500": "#70baaa",
                            "600": "#8fc8bc",
                            "700": "#add7ce",
                            "800": "#cbe6e0",
                            "900": "#e9f5f2",
                            "foreground": "#000",
                            "DEFAULT": "#52ab98"
                        },
                        "success": {
                            "50": "#19332e",
                            "100": "#275148",
                            "200": "#356f63",
                            "300": "#448d7d",
                            "400": "#52ab98",
                            "500": "#70baaa",
                            "600": "#8fc8bc",
                            "700": "#add7ce",
                            "800": "#cbe6e0",
                            "900": "#e9f5f2",
                            "foreground": "#000",
                            "DEFAULT": "#52ab98"
                        },
                        "warning": {
                            "50": "#493600",
                            "100": "#745600",
                            "200": "#9f7500",
                            "300": "#c99500",
                            "400": "#f4b400",
                            "500": "#f6c12d",
                            "600": "#f8ce59",
                            "700": "#fadb86",
                            "800": "#fce9b3",
                            "900": "#fef6df",
                            "foreground": "#000",
                            "DEFAULT": "#f4b400"
                        },
                        "danger": {
                            "50": "#411918",
                            "100": "#672726",
                            "200": "#8d3633",
                            "300": "#b34441",
                            "400": "#d9534f",
                            "500": "#e0716e",
                            "600": "#e68f8d",
                            "700": "#edadab",
                            "800": "#f4cbca",
                            "900": "#faeae9",
                            "foreground": "#000",
                            "DEFAULT": "#d9534f"
                        },
                        "background": "#000000",
                        "foreground": "#ffffff",
                        "content1": {
                            "DEFAULT": "#18181b",
                            "foreground": "#fff"
                        },
                        "content2": {
                            "DEFAULT": "#27272a",
                            "foreground": "#fff"
                        },
                        "content3": {
                            "DEFAULT": "#3f3f46",
                            "foreground": "#fff"
                        },
                        "content4": {
                            "DEFAULT": "#52525b",
                            "foreground": "#fff"
                        },
                        "focus": "#2b6777",
                        "overlay": "#ffffff"
                    }
                }
            },
            "layout": {
                "disabledOpacity": "0.4",
                "radius": {
                    "small": "5px",
                    "medium": "0.5rem"
                },
            }
        }
    )]
}