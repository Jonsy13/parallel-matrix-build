import { Checkbox, withStyles } from '@material-ui/core';

export const CheckBox = withStyles((theme) => ({
  root: {
    color: theme.palette.border.main,
    '&$checked': {
      color: theme.palette.background.paper,
      '& .MuiSvgIcon-root': {
        background: theme.palette.secondary.main,
        borderRadius: '0.25rem',
      },
    },
  },
  checked: {},
}))(Checkbox);
