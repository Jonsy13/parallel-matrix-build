import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: theme.spacing(0, 1),
    width: '1rem',
  },
  buttons: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  infoText: {
    paddingRight: theme.spacing(1.5),
  },
  menuIcon: {
    margin: theme.spacing(0, 1),
    width: '1.25rem',
  },
  button: {
    minWidth: 0,
    padding: theme.spacing(1.5, 1),
  },

  // Menu option with icon
  menuList: {
    marginLeft: theme.spacing(-3),
  },
  menuItem: {
    width: '9.5rem',
    height: '2.5rem',
  },
  expDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  btnImg: {
    width: '1rem',
    height: '1rem',
    marginTop: theme.spacing(0.25),
  },
  btnText: {
    fontSize: '0.875rem',
    lineHeight: '140%',
    paddingLeft: theme.spacing(1.625),
  },
}));

export default useStyles;
