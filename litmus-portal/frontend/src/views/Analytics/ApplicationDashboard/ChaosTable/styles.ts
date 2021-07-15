import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow:
      '0 0.3px 0.9px rgba(0, 0, 0, 0.1), 0 1.6px 3.6px rgba(0, 0, 0, 0.13)',
    borderRadius: '3px 3px 0 0',
  },

  tableMain: {
    borderTop: `1px solid ${theme.palette.border.main}`,
    background: theme.palette.background.paper,
    maxHeight: '30rem',
    '&::-webkit-scrollbar': {
      width: '0.2em',
    },
    '&::-webkit-scrollbar-track': {
      webkitBoxShadow: `inset 0 0 6px ${theme.palette.common.black}`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
    },
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '& tr': {
      borderBottom: `1px solid ${theme.palette.border.main}`,
      '& td': {
        borderBottom: 0,
      },
    },
  },

  empty: {
    '& tr': {
      borderBottom: 0,
      '& td': {
        borderBottom: 0,
      },
    },
  },

  tableBody: {
    background: theme.palette.background.paper,
  },

  tableHead: {
    background: theme.palette.background.paper,
  },

  nameHead: {
    display: 'flex',
    color: theme.palette.text.hint,
    fontSize: '0.75rem',
    lineHeight: '150%',
    letterSpacing: '0.02em',
    margin: theme.spacing(1, 0),
  },

  verdictText: {
    marginTop: theme.spacing(0.5),
  },

  tableObjects: {
    textAlign: 'left',
    color: theme.palette.text.primary,
    fontSize: '0.75rem',
    letterSpacing: '0.02em',
    lineHeight: '150%',
    paddingLeft: theme.spacing(0.5),
    margin: theme.spacing(1, 0),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  flexObject: {
    display: 'flex',
    gap: '0.5rem',
  },

  headSpacing: {
    minWidth: '5rem',
    paddingLeft: theme.spacing(2),
  },

  checkbox: {
    padding: theme.spacing(0.5, 0, 0, 2.5),
  },

  noRecords: {
    height: '10rem',
    display: 'flex',
    padding: theme.spacing(5, 3),
    justifyContent: 'center',
  },

  loading: {
    flexDirection: 'column',
    paddingBottom: theme.spacing(7.5),
  },

  cloudIcon: {
    height: '5rem',
    width: '5rem',
  },

  noRecordsText: {
    color: theme.palette.text.hint,
    padding: theme.spacing(2),
    fontSize: '1.5rem',
  },

  pass: {
    color: theme.palette.success.main,
    marginRight: theme.spacing(1),
  },

  fail: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(1),
  },

  failedToInject: {
    color: theme.palette.warning.main,
    marginRight: theme.spacing(1),
  },

  awaited: {
    color: theme.palette.text.hint,
    marginRight: theme.spacing(1),
  },

  colorCircle: {
    height: '0.5rem',
    width: '0.5rem',
    borderRadius: '50%',
    margin: 'auto 0',
  },

  headerSection: {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflowX: 'auto',
    height: '6rem',
    backgroundColor: theme.palette.background.paper,
  },
  search: {
    marginLeft: theme.spacing(8.5),
  },
  selectText: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0.4),
  },
  // Form Select Properties
  formControl: {
    margin: theme.spacing(0.5, 2.5, 0.5, 0.5),
    height: '2.6rem',
    minWidth: '9rem',
  },
  verdictForm: {
    marginRight: theme.spacing(3.5),
  },

  // select
  menuList: {
    boxShadow: '0 5px 9px rgba(0, 0, 0, 0.1)',
  },
  menuListItem: {
    background: `${theme.palette.background.paper} !important`,
    fontSize: '0.875rem',
    lineHeight: '150%',
    height: '1.875rem',
    '&:hover': {
      background: `${theme.palette.cards.highlight} !important`,
    },
    '&.Mui-selected': {
      background: `${theme.palette.cards.highlight} !important`,
    },
  },
}));

export const useOutlinedInputStyles = makeStyles((theme: Theme) => ({
  root: {
    '& $notchedOutline': {
      borderColor: theme.palette.border.main,
    },
    '&:hover $notchedOutline': {
      borderColor: theme.palette.highlight,
    },
    '&$focused $notchedOutline': {
      borderColor: theme.palette.highlight,
    },
    height: '2.75rem',
  },
  focused: {},
  notchedOutline: {},
}));

export default useStyles;
