import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 2),
    margin: '0 auto',
    width: '98%',
    height: '100%',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      width: '99%',
    },
  },

  // Inner Container
  innerContainer: {
    margin: theme.spacing(4, 'auto'),
    width: '95%', // Inner width of the container
  },

  headerText: {
    marginTop: theme.spacing(1.25),
    fontSize: '1.2rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4rem',
    },
  },
  errorText: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(15),
    marginBottom: theme.spacing(10),
    fontSize: '1.6rem',
    color: theme.palette.error.main,
  },
  description: {
    width: '50rem',
    marginTop: theme.spacing(3.25),
    fontSize: '1.0625rem',
  },
  testHeading: {
    marginTop: theme.spacing(6.25),
    fontSize: '1.5625rem',
  },
  testInfo: {
    fontSize: '0.9375rem',
    opacity: 0.4,
    width: '30rem',
    marginLeft: theme.spacing(8),
  },
  horizontalLine: {
    marginTop: theme.spacing(7.5),
    marginBottom: theme.spacing(1.25),
    borderColor: 'rgba(0, 0, 0, 0.1);',
  },
  modalDiv: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  buttonOutlineDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonOutlineText: {
    paddingLeft: theme.spacing(1.5),
  },
  testType: {
    fontSize: '1.0625rem',
    paddingRight: theme.spacing(1.25),
  },
  testResult: {
    color: theme.palette.primary.dark,
    fontSize: '1.0625rem',
  },
  table: {
    marginTop: theme.spacing(2),
    alignItems: 'center',
    width: '56.26rem',
    border: '0.0625rem solid',
    borderColor: '#E5E5E5',
  },
  tableHeader: {
    marginTop: theme.spacing(7.5),
  },
  headingModal: {
    fontSize: '1.5625rem',
    marginLeft: theme.spacing(2.5),
  },
  tableHeading: {
    fontSize: '0.875rem',
    color: theme.palette.text.disabled,
    opacity: 0.6,
    textAlign: 'left',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  tableHeadingLine: {
    fontSize: '0.875rem',
    color: theme.palette.text.disabled,
    opacity: 0.6,
    textAlign: 'left',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderLeft: '0.0625 solid',
    borderLeftColor: theme.palette.common.black,
  },
  tableData: {
    fontSize: '1.125rem',
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
  tableWeight: {
    fontSize: '1.125rem',
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
  tablePoints: {
    fontSize: '1.125rem',
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
  tableResult: {
    color: theme.palette.primary.dark,
    fontSize: '1.125rem',
  },
  buttonDiv: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(48),
    marginBottom: theme.spacing(5),
  },
  resultDiv: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(8.75),
  },
  resultText: {
    fontSize: '1.125rem',
    color: theme.palette.common.black,
    opacity: 0.6,
    width: '8.75rem',
  },
  resultTextInfo: {
    fontSize: '1.125rem',
    color: theme.palette.common.black,
    opacity: 0.6,
    width: '15.625rem',
  },
  totalScore: {
    fontSize: '2.25rem',
    color: '#F6B92B',
  },
  reliabilityScore: {
    fontSize: '2.25rem',
    color: theme.palette.secondary.dark,
  },
  testTips: {
    width: '28.125rem',
    height: '4.0625rem',
    fontSize: '0.875rem',
  },
  progressBar: {
    width: '6.5625rem',
  },
  mainResultDiv: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
  },
  horizontalLineResult: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1.25),
    borderColor: 'rgba(0, 0, 0, 0.1);',
  },
  toolTipGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  toolTip1: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(16.25),
  },
  toolTip2: {
    marginLeft: theme.spacing(-2),
    marginTop: theme.spacing(0.375),
  },
  toolTip3: {
    marginLeft: theme.spacing(-0.625),
    marginTop: theme.spacing(0.375),
  },
  outerResultDiv: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(5),
  },
  toolTipDiv: {
    marginLeft: theme.spacing(1.25),
  },
  gotItBtn: {
    marginBottom: theme.spacing(1.25),
  },
}));

export default useStyles;
