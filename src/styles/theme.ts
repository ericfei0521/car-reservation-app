export interface Theme {
    color: {
        error: string
        normal: string
        disable: string
        secondary: string
    }
    border: {
        normal: string
        disable: string
        error: string
    }
    textScale: {
        h1: string
        h2: string
        h3: string
        normal: string
        small: string
    }
}

export const theme: Theme = {
    color: {
        error: "#f00",
        normal: "#000",
        disable: "#999",
        secondary: "#262626",
    },
    border: {
        normal: "#000",
        disable: "#999",
        error: "#f00",
    },
    textScale: {
        h1: "24px",
        h2: "20px",
        h3: "18px",
        normal: "14px",
        small: "12px",
    },
}
