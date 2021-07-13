import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  // Personal details
  headerText: {
    marginTop: theme.spacing(7.5),
    fontSize: '1.5625rem',
  },
  input: {
    display: 'none',
    alignItems: 'center',
  },
  // button styles for saving the changes of personal details
  saveButton: {
    margin: theme.spacing(2, 0, 0, 12.4),
  },

  // styles for modal and its components
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(15),
    paddingBottom: '7rem',
    color: 'none',
  },
  text: {
    width: '31rem',
    height: '5.875rem',
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(3.75),
  },
  typo: {
    fontSize: '2.25rem',
  },
  text1: {
    width: '27.5rem',
    marginBottom: theme.spacing(3.75),
  },
  typo1: {
    fontSize: '1rem',
    marginBottom: theme.spacing(2),
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
    color: 'none',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(7, 0),
  },
  textError: {
    width: '20.5rem',
    marginTop: theme.spacing(13.75),
    margin: '0 auto',
  },
  typoSub: {
    fontSize: '1rem',
  },
}));
export default useStyles;
