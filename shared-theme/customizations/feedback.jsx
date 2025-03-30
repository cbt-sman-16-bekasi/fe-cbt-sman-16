import { alpha } from '@mui/material/styles';
import { gray, orange, cbtColor } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const feedbackCustomizations = {
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 10,
        backgroundColor: (theme.vars || theme).palette.cbtPrimary.lightPurple,
        color: (theme.vars || theme).palette.text.alert,
        border: `1px solid ${cbtColor.primary.purple}`,
        '& .MuiAlert-icon': {
          color: orange[500],
        },
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.text.alert,
          backgroundColor: `${cbtColor.primary.lightPurple}`,
          border: `1px solid ${cbtColor.primary.purple}`,
        }),
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: gray[200],
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
      }),
    },
  },
};
