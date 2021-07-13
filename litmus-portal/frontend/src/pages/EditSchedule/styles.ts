import { makeStyles, Theme } from '@material-ui/core/styles';

export const externalStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 2),
    margin: '0 auto',
    width: '100%',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      width: '99%',
    },
  },
}));

export const useStyles = makeStyles((theme: Theme) => ({
  horizontalLine: {
    background: theme.palette.border.main,
  },
  title: {
    padding: theme.spacing(0, 2),
    fontWeight: 700,
    fontSize: '2rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '2.3rem',
    },
  },
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(1, 2),
    margin: theme.spacing(2, 'auto'),
    width: '100%',
    flexDirection: 'column',
  },

  // Inner Container
  innerContainer: {
    margin: theme.spacing(4, 'auto'),
    width: '95%', // Inner width of the container
  },

  suHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: '1.2rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4rem',
    },
  },
  description: {
    margin: theme.spacing(3, 0),
    fontSize: '1rem',
  },
  bfinIcon: {
    width: '7rem',
    height: '6.31rem',
  },

  // Body
  outerSum: {
    display: 'flex',
    flexDirection: 'column',
  },
  summaryDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    margin: theme.spacing(1, 0),
  },
  innerSumDiv: {
    alignContent: 'center',
    display: 'table-cell',
    verticalAlign: 'middle',
    width: '20%',
    [theme.breakpoints.up('lg')]: {
      width: '10%',
    },
  },
  sumText: {
    width: '100%',
    margin: theme.spacing(2, 0),
    fontWeight: 700,
    fontSize: '1.2rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4rem',
    },
  },
  col1: {
    alignContent: 'center',
    color: theme.palette.highlight,
    fontSize: '1rem',
    paddingTop: theme.spacing(0.5),
    verticalAlign: 'middle',
  },
  schedule: {
    fontSize: '0.85rem',
    padding: theme.spacing(0.75, 0, 2, 0),
  },
  col2: {
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(5),
    fontWeight: 700,
    width: '75%',
  },
  schCol2: {
    width: '75%',
    marginLeft: theme.spacing(5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clusterName: {
    fontSize: '0.85rem',
    marginLeft: theme.spacing(7),
    paddingTop: theme.spacing(0.5),
  },
  editButton: {
    height: '1rem',
  },
  editIcon: {
    color: theme.palette.text.primary,
    height: '0.8rem',
  },
  link: {
    fontSize: '0.875rem',
    color: theme.palette.secondary.dark,
  },
  adjWeights: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '80%',
    [theme.breakpoints.up('lg')]: {
      width: '90%',
    },
  },
  config: {
    height: '3rem',
    fontSize: '0.9375rem',
    color: theme.palette.text.disabled,
    width: '30rem',
    margin: theme.spacing(3.75, 0, 30, 0),
  },
  typoCol2: {
    fontSize: '1rem',
  },
  textEdit: {
    marginTop: theme.spacing(7.5),
  },
  buttonOutlineText: {
    padding: theme.spacing(1.5),
  },
  errorText: {
    color: theme.palette.error.main,
    fontSize: '1rem',
    marginLeft: theme.spacing(5),
  },
  yamlFlex: {
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
    marginLeft: theme.spacing(5),
  },
  progress: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    marginLeft: theme.spacing(5),
  },
  spacingHorizontal: {
    margin: theme.spacing(0, 1),
  },
  buttomPad: {
    paddingBottom: theme.spacing(3.75),
  },
  closeBtn: {
    color: theme.palette.secondary.contrastText,
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  verifyYAMLButton: {
    width: '20%',
  },
  bold: {
    fontWeight: 700,
  },

  // Modal
  modal: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10),
    },
    padding: theme.spacing(3),
  },
  heading: {
    fontSize: '2rem',
    textalign: 'center',
    marginTop: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  headWorkflow: {
    fontsize: '2rem',
    textalign: 'center',
    color: theme.palette.text.primary,
    marginTop: theme.spacing(3),
  },
  button: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    marginTop: theme.spacing(5),
  },
  closeButton: {
    borderColor: theme.palette.border.main,
  },
  successful: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    margin: theme.spacing(2, 0),
  },

  // Editor
  editorWrapper: {
    marginBottom: theme.spacing(-4),
  },
  flex: {
    display: 'flex',
  },
  additional: {
    width: '95%',
    margin: '0rem auto',
    justifyContent: 'space-between',
  },
  name: {
    margin: theme.spacing(1, 0, 2, 2),
    fontWeight: 'bold',
  },
  editorTopBtn: {
    padding: '0.4rem',
    fontSize: '0.8rem',
  },
  editorCloseBtn: {
    width: '0.5rem',
    borderColor: theme.palette.disabledBackground,
    color: theme.palette.text.disabled,
    minWidth: '2rem',
    padding: '0.2rem',
    fontSize: '1rem',
  },
}));
