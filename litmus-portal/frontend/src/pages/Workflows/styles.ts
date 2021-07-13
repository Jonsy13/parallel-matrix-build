import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    color: theme.palette.text.primary,
    margin: theme.spacing(1, 1.5, 2.5, 1.5),
  },
  scheduleBtn: {
    marginLeft: 'auto',
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
    marginBottom: theme.spacing(1),
  },
}));

export default useStyles;
