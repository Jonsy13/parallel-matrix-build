import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(3.75),
    border: `1px solid ${theme.palette.border.main}`,
    backgroundColor: theme.palette.cards.background,
    borderRadius: '0.1875rem',
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  // Upper segment
  headerText: {
    marginTop: theme.spacing(7.5),
    fontSize: '1.5625rem',
    marginBottom: theme.spacing(5),
  },

  divider: {
    marginTop: theme.spacing(3.75),
  },

  // Lower segment
  outerPass: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '63.75rem',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  innerPass: {
    display: 'flex',
    flexDirection: 'column',
  },
  col2: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(5),
    height: '16.375rem',
    maxWidth: '20.625rem',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      order: -1,
      marginBottom: theme.spacing(5),
      marginLeft: theme.spacing(0),
    },
  },
  txt1: {
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(3.75),
    fontSize: '1rem',
  },
  txt2: {
    marginBottom: theme.spacing(2.5),
    fontSize: '1rem',
  },

  // Password Modal content styles
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(15),
    paddingBottom: '7rem',
  },
  text: {
    width: '23.5rem',
    height: '5.875rem',
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(3.75),
  },
  typo: {
    fontSize: '2.25rem',
  },
  text1: {
    width: '27.5rem',
    height: '1.6875rem',
  },
  typo1: {
    fontSize: '1rem',
  },

  buttonModal: {
    marginTop: theme.spacing(3.75),
  },
  textSecondError: {
    width: '27.5rem',
    height: '1.6875rem',
    marginTop: theme.spacing(3.75),
    margin: '0 auto',
  },
  errDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(7, 0),
  },
  typoSub: {
    fontSize: '1rem',
  },
  textError: {
    width: '20.5rem',
    marginTop: theme.spacing(13.75),
    margin: '0 auto',
  },
}));
export default useStyles;
