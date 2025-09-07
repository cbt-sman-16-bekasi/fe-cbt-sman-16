import { alpha } from "@mui/material/styles";
import { red, orange, green, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const brand = {
  50:  'hsl(174, 100%, 95%)', // paling terang
  100: 'hsl(174, 100%, 85%)',
  200: 'hsl(174, 100%, 75%)',
  300: 'hsl(174, 100%, 65%)',
  400: 'hsl(174, 100%, 50%)',
  500: 'hsl(174, 100%, 40%)', // base #009688
  600: 'hsl(174, 100%, 32%)',
  700: 'hsl(174, 100%, 25%)',
  800: 'hsl(174, 100%, 18%)',
  900: 'hsl(174, 100%, 12%)', // paling gelap
};

export const cbtColor = {
  primary: {
    teal: "#009688",      // utama, identitas & highlight brand
    deepTeal: "#00695C",  // secondary
    violet: "#130A36",
    darkPurple: "#4605B5",
    mediumPurple: "#8B1EFC",
    purple: "#9366FE",
    lightPurple: "#EEE3FF",
  },
  accents: {
    red: "#CB393B",
    blue: "#3665EE",
    green: "#2FD574",
    yellow: "#FEDC00",
    amber: "#F9A825",    // accent utama CTA
    white: "#FFFFFF",
    black: "#000000",
  },
  text: {
    primary: "#000000",
    darkGray: "#424242",
    disabled: "#424242",
    alert: "#CB393B",
  },
  background: {
    lightGray: "#F5F5F5",
    white: "#FFFFFF",
  },
};

const defaultPallete = {
  primary: {
    light: cbtColor.primary.teal,
    main: cbtColor.primary.teal,
    dark: cbtColor.primary.deepTeal,
    contrastText: cbtColor.accents.white,
  },
  secondary: {
    light: cbtColor.primary.purple,
    main: cbtColor.primary.mediumPurple,
    dark: cbtColor.primary.darkPurple,
    contrastText: cbtColor.accents.white,
  },
  info: {
    light: cbtColor.primary.teal,
    main: cbtColor.primary.teal,
    dark: cbtColor.primary.deepTeal,
    contrastText: cbtColor.accents.white,
  },
  warning: {
    light: "#FFD54F",
    main: cbtColor.accents.amber, // Amber brand
    dark: "#F57F17",
  },
  error: {
    light: red[300],
    main: red[500],
    dark: red[700],
  },
  success: {
    light: "#66BB6A",
    main: cbtColor.accents.green, // Green brand
    dark: "#1B5E20",
  },
  grey: {
    ...grey,
  },
  divider: alpha(grey[600], 0.4),
  background: {
    default: cbtColor.background.lightGray,
    darkGray: "#b8b8b8",
    paper: "hsl(220, 35%, 97%)",
  },
  text: {
    primary: cbtColor.text.darkGray,
    secondary: grey[600],
    warning: cbtColor.accents.amber,
    alert: red[600],
    white: '#FFFFFF',
    disabled: "#8e8d8d",
  },
  action: {
    hover: alpha(cbtColor.primary.deepTeal, 0.08),
    selected: cbtColor.primary.teal,
    disabled: alpha(grey[400], 0.4),
  },
  baseShadow:
    "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px",
}

export const colorSchemes = {
  light: {
    palette: defaultPallete,
  },
  dark: {
    palette: defaultPallete,
  }
};

export const typography = {
  fontFamily: "Poppins, Inter, sans-serif",
  h1: {
    fontSize: "3rem",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: "2.25rem",
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: "1.875rem",
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  h6: {
    fontSize: "1.125rem",
    fontWeight: 600,
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 500,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
  },
};

export const shape = {
  borderRadius: 12, // lebih modern, smooth
};

const defaultShadows = [
  "none",
  "var(--template-palette-baseShadow)",
  ...createTheme().shadows.slice(2),
];

export const shadows = defaultShadows;