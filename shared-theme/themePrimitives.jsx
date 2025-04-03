import { createTheme, alpha } from '@mui/material/styles';

const defaultTheme = createTheme();

const customShadows = [...defaultTheme.shadows];

export const brand = {
  50: 'hsl(210, 100%, 95%)',
  100: 'hsl(210, 100%, 92%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 65%)',
  400: 'hsl(210, 98%, 48%)',
  500: 'hsl(210, 98%, 42%)',
  600: 'hsl(210, 98%, 55%)',
  700: 'hsl(210, 100%, 35%)',
  800: 'hsl(210, 100%, 16%)',
  900: 'hsl(210, 100%, 21%)',
};

export const gray = {
  50: 'hsl(220, 35%, 97%)',
  100: 'hsl(220, 30%, 94%)',
  200: 'hsl(220, 20%, 88%)',
  300: 'hsl(220, 20%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 20%, 35%)',
  700: 'hsl(220, 20%, 25%)',
  800: 'hsl(220, 30%, 6%)',
  900: 'hsl(220, 35%, 3%)',
};

export const green = {
  50: 'hsl(120, 80%, 98%)',
  100: 'hsl(120, 75%, 94%)',
  200: 'hsl(120, 75%, 87%)',
  300: 'hsl(120, 61%, 77%)',
  400: 'hsl(120, 44%, 53%)',
  500: 'hsl(120, 59%, 30%)',
  600: 'hsl(120, 70%, 25%)',
  700: 'hsl(120, 75%, 16%)',
  800: 'hsl(120, 84%, 10%)',
  900: 'hsl(120, 87%, 6%)',
};

export const orange = {
  50: 'hsl(45, 100%, 97%)',
  100: 'hsl(45, 92%, 90%)',
  200: 'hsl(45, 94%, 80%)',
  300: 'hsl(45, 90%, 65%)',
  400: 'hsl(45, 90%, 40%)',
  500: 'hsl(45, 90%, 35%)',
  600: 'hsl(45, 91%, 25%)',
  700: 'hsl(45, 94%, 20%)',
  800: 'hsl(45, 95%, 16%)',
  900: 'hsl(45, 93%, 12%)',
};

export const red = {
  50: 'hsl(0, 100%, 97%)',
  100: 'hsl(0, 92%, 90%)',
  200: 'hsl(0, 94%, 80%)',
  300: 'hsl(0, 90%, 65%)',
  400: 'hsl(0, 90%, 40%)',
  500: 'hsl(0, 90%, 30%)',
  600: 'hsl(0, 91%, 25%)',
  700: 'hsl(0, 94%, 18%)',
  800: 'hsl(0, 95%, 12%)',
  900: 'hsl(0, 93%, 6%)',
};

export const cbtColor = {
  primary: {
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
    white: "#FFFFFF",
    black: "#000000",
  }
}

export const colorSchemes = {
  light: {
    palette: {
      cbtPrimary: {
        violet: cbtColor.primary.violet,
        darkPurple: cbtColor.primary.darkPurple,
        mediumPurple: cbtColor.primary.mediumPurple,
        purple: cbtColor.primary.purple,
        lightPurple: cbtColor.primary.lightPurple,

        main: cbtColor.primary.mediumPurple,
        light: cbtColor.primary.mediumPurple,
        dark: cbtColor.primary.mediumPurple,
        contrastText: cbtColor.accents.white,
      },
      cbtAccents: {
        red: cbtColor.accents.red,
        blue: cbtColor.accents.blue,
        green: cbtColor.accents.green,
        yellow: cbtColor.accents.yellow,
        white: cbtColor.accents.white,
        black: cbtColor.accents.black
      },
      primary: {
        light: cbtColor.primary.mediumPurple,
        main: cbtColor.primary.mediumPurple,
        dark: cbtColor.primary.mediumPurple,
        contrastText: cbtColor.accents.white,
      },
      info: {
        light: cbtColor.primary.purple,
        main: cbtColor.primary.purple,
        dark: cbtColor.primary.purple,
        contrastText: cbtColor.accents.white,
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[800],
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[800],
      },
      success: {
        light: cbtColor.primary.violet,
        main: cbtColor.primary.violet,
        dark: cbtColor.primary.violet,
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[300], 0.4),
      background: {
        default: 'hsl(0, 0%, 99%)',
        paper: 'hsl(220, 35%, 97%)',
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
        warning: orange[400],
        alert: gray[800]
      },
      action: {
        hover: alpha(gray[200], 0.2),
        selected: "#8B1EFC",
      },
      baseShadow:
        'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
    },
  },
  dark: {
    palette: {
      cbtPrimary: {
        violet: cbtColor.primary.violet,
        darkPurple: cbtColor.primary.darkPurple,
        mediumPurple: cbtColor.primary.mediumPurple,
        purple: cbtColor.primary.purple,
        lightPurple: cbtColor.primary.lightPurple,
      },
      cbtAccents: {
        red: cbtColor.accents.red,
        blue: cbtColor.accents.blue,
        green: cbtColor.accents.green,
        yellow: cbtColor.accents.yellow,
        white: cbtColor.accents.white,
        black: cbtColor.accents.black
      },
      primaryCbt: {
        light: cbtColor.primary.mediumPurple,
        main: cbtColor.primary.mediumPurple,
        dark: cbtColor.primary.mediumPurple,
        contrastText: cbtColor.accents.white,
      },
      primary: {
        light: cbtColor.primary.mediumPurple,
        main: cbtColor.primary.mediumPurple,
        dark: cbtColor.primary.mediumPurple,
        contrastText: cbtColor.accents.white,
      },
      info: {
        light: cbtColor.primary.purple,
        main: cbtColor.primary.purple,
        dark: cbtColor.primary.purple,
        contrastText: cbtColor.accents.white,
      },
      warning: {
        light: orange[400],
        main: orange[500],
        dark: orange[700],
      },
      error: {
        light: red[400],
        main: red[500],
        dark: red[700],
      },
      success: {
        light: green[400],
        main: green[500],
        dark: green[700],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[700], 0.6),
      background: {
        default: gray[900],
        paper: 'hsl(220, 30%, 7%)',
      },
      text: {
        primary: 'hsl(0, 0%, 100%)',
        secondary: gray[400],
        alert: gray[800]
      },
      action: {
        hover: alpha(gray[600], 0.2),
        selected: "#8B1EFC",
      },
      baseShadow:
        'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
    },
  },
};

export const typography = {
  fontFamily: 'Inter, sans-serif',
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
};

export const shape = {
  borderRadius: 8,
};

const defaultShadows = [
  'none',
  'var(--template-palette-baseShadow)',
  ...defaultTheme.shadows.slice(2),
];

export const shadows = defaultShadows;
