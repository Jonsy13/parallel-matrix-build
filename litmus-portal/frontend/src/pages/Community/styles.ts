import { makeStyles } from '@material-ui/core/styles';

// Community Component Styling
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 1.5, 1.5),
    overflowX: 'hidden',
  },
  mainHeader: {
    color: theme.palette.text.primary,
    margin: theme.spacing(0, 1.5, 2.5, 0),
  },

  LitmusAnalyticsBlock: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  errorMessage: {
    marginTop: theme.spacing(35),
  },

  LitmusAnalyticsDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(0.4),
    paddingBottom: theme.spacing(0.4),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  header2: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },

  cardDiv: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  paper: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    backgroundColor: '#FFF',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
  },
  card: {
    backgroundColor: theme.palette.primary.main,
    height: '21.25rem',
    width: '20rem',
    textAlign: 'center',
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      marginTop: theme.spacing(2),
      width: '100%',
      flexDirection: 'column',
    },
  },

  cardContent: {
    marginTop: theme.spacing(4),
  },

  LitmusOnDev: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },

  LitmusOnDevSpan: {
    position: 'relative',
    fontWeight: 'normal',
    fontSize: '1.5rem',
    bottom: theme.spacing(2),
    left: theme.spacing(3),
  },

  devToLogo: {
    fill: 'white',
    filter:
      'invert(98%) sepia(100%) saturate(0%) hue-rotate(86deg) brightness(118%) contrast(119%)',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    width: '5rem',
    height: '3rem',
  },
  imgDiv: {
    '& img': {
      userDrag: 'none',
    },
  },
  followBtn: {
    width: '10rem',
    height: '3rem',
    backgroundColor: theme.palette.secondary.contrastText,
    fontSize: '0.8rem',
    color: theme.palette.common.black,
    textTransform: 'none',
  },

  devToLink: {
    textDecoration: 'none',
  },

  LitmusUsedBlock: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },

  LitmusUsedDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(0.4),
    paddingBottom: theme.spacing(0.4),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  quickActionCard: {
    height: '21.25rem',
    width: '15rem',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(7),
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      width: '15rem',
      flexDirection: 'column',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      margin: 0,
      marginTop: theme.spacing(5),
      width: '20rem',
      flexDirection: 'column',
    },
  },
}));

export default useStyles;
