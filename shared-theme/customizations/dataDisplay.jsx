import { alpha } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { typographyClasses } from '@mui/material/Typography';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { chipClasses } from '@mui/material/Chip';
import { iconButtonClasses } from '@mui/material/IconButton';
import { red, green, orange } from "@mui/material/colors";
import { brand } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const dataDisplayCustomizations = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${svgIconClasses.root}`]: {
          width: '1rem',
          height: '1rem',
          color: (theme.vars || theme).palette.text.secondary,
        },
        [`& .${typographyClasses.root}`]: {
          fontWeight: 500,
        },
        [`& .${buttonBaseClasses.root}`]: {
          display: 'flex',
          gap: 8,
          padding: '2px 8px',
          borderRadius: (theme.vars || theme).shape.borderRadius,
          opacity: 0.7,
          '&.Mui-selected': {
            opacity: 1,
            backgroundColor: alpha(theme.palette.action.selected, 1),
            [`& .${svgIconClasses.root}`]: {
              color: (theme.vars || theme).palette.common.white,
            },
            [`& .${typographyClasses.root}`]: {
              color: (theme.vars || theme).palette.common.white,
            },
            '&:focus-visible': {
              backgroundColor: alpha(theme.palette.action.selected, 1),
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.action.selected, 0.5),
            },
          },
          '&:focus-visible': {
            backgroundColor: 'transparent',
          },
        },
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.body2.lineHeight,
      }),
      secondary: ({ theme }) => ({
        fontSize: theme.typography.caption.fontSize,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'transparent',
        padding: '4px 8px',
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
      },
    },
  },
  MuiChip: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        border: '1px solid',
        borderRadius: '999px',
        [`& .${chipClasses.label}`]: {
          fontWeight: 600,
        },
      }),
    },
    variants: [
      {
        props: {
          color: 'default',
        },
        style: ({ theme }) => ({
          borderColor: brand[200],
          backgroundColor: brand[100],
          [`& .${chipClasses.label}`]: {
            color: brand[500],
          },
          [`& .${chipClasses.icon}`]: {
            color: brand[500],
          },
          ...(theme.palette.mode === 'dark' && {
            borderColor: brand[700],
            backgroundColor: brand[800],
            [`& .${chipClasses.label}`]: {
              color: green[300],
            },
            [`& .${chipClasses.icon}`]: {
              color: green[300],
            },
          }),
        }),
      },
      {
        props: {
          color: 'success',
        },
        style: ({ theme }) => ({
          borderColor: green[200],
          backgroundColor: green[50],
          [`& .${chipClasses.label}`]: {
            color: green[500],
          },
          [`& .${chipClasses.icon}`]: {
            color: green[500],
          },
          ...(theme.palette.mode === 'dark' && {
            borderColor: green[800],
            backgroundColor: green[900],
            [`& .${chipClasses.label}`]: {
              color: green[300],
            },
            [`& .${chipClasses.icon}`]: {
              color: green[300],
            },
          }),
        }),
      },
      {
        props: {
          color: 'error',
        },
        style: ({ theme }) => ({
          borderColor: red[100],
          backgroundColor: red[50],
          [`& .${chipClasses.label}`]: {
            color: red[500],
          },
          [`& .${chipClasses.icon}`]: {
            color: red[500],
          },
          ...(theme.palette.mode === 'dark' && {
            borderColor: red[800],
            backgroundColor: red[900],
            [`& .${chipClasses.label}`]: {
              color: red[200],
            },
            [`& .${chipClasses.icon}`]: {
              color: red[300],
            },
          }),
        }),
      },
      {
        props: { size: 'small' },
        style: ({ theme }) => ({
          maxHeight: 20,
          [`& .${chipClasses.label}`]: {
            fontSize: theme.typography.caption.fontSize,
          },
          [`& .${svgIconClasses.root}`]: {
            fontSize: theme.typography.caption.fontSize,
          },
        }),
      },
      {
        props: { size: 'medium' },
        style: ({ theme }) => ({
          [`& .${chipClasses.label}`]: {
            fontSize: theme.typography.caption.fontSize,
          },
        }),
      },
    ],
  },
  MuiTablePagination: {
    styleOverrides: {
      actions: {
        display: 'flex',
        gap: 8,
        marginRight: 6,
        [`& .${iconButtonClasses.root}`]: {
          minWidth: 0,
          width: 36,
          height: 36,
        },
      },
      toolbar: {
        '& .MuiIconButton-root': {
          // Styles for direction buttons (previous and next)
          backgroundColor: 'rgba(0, 0, 0, 0.04)', // Example background color
          borderRadius: '50%', // Makes it a circle
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)', // Hover effect
          },
        },
      },
    },
  },
  MuiIcon: {
    defaultProps: {
      fontSize: 'small',
    },
    styleOverrides: {
      root: {
        variants: [
          {
            props: {
              fontSize: 'small',
            },
            style: {
              fontSize: '1rem',
            },
          },
        ],
      },
    },
  },
};
