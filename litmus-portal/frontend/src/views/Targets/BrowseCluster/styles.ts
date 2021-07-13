import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // Header Section Properties
  headerSection: {
    width: '100%',
    height: '5.625rem',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.0625rem solid',
    borderColor: theme.palette.border.main,
    backgroundColor: theme.palette.common.white,
  },
  popOver: {
    marginTop: theme.spacing(5),
  },
  search: {
    fontSize: '1rem',
    marginRight: 'auto',
    borderBottom: `1px solid ${theme.palette.border.main}`,
    marginLeft: theme.spacing(6.25),
  },
  // Form Select Properties
  formControl: {
    margin: theme.spacing(0.5),
    marginRight: theme.spacing(2.5),
    height: '2.5rem',
    minWidth: '9rem',
  },
  selectText: {
    height: '2.5rem',
    color: theme.palette.text.primary,
    padding: theme.spacing(0.5),
  },
  selectRange: {
    display: 'flex',
    flexDirection: 'row',
    height: '2.5rem',
    minWidth: '9rem',
    borderColor: theme.palette.border.main,
    marginRight: theme.spacing(3.75),
    textTransform: 'none',
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
  displayDate: {
    marginLeft: theme.spacing(1),
    width: '100%',
  },
  // Table and Table Data Properties
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  tableMain: {
    marginTop: theme.spacing(4.25),
    border: `1px solid ${theme.palette.border.main}`,
    backgroundColor: theme.palette.common.white,
    height: '28.219rem',
    '&::-webkit-scrollbar': {
      width: '0.2em',
    },
    '&::-webkit-scrollbar-track': {
      webkitBoxShadow: `inset 0 0 6px ${theme.palette.common.black}`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  tableRows: {
    padding: theme.spacing(4),
    color: theme.palette.text.primary,
    height: '4.6875rem',
  },
  dataRow: {
    height: '4.6875rem',
  },
  headerStatus: {
    paddingLeft: theme.spacing(7),
    color: theme.palette.text.primary,
  },
  workflowName: {
    borderRight: `1px solid ${theme.palette.border.main}`,
    color: theme.palette.text.primary,
  },
  targetsIcon: {
    paddingLeft: theme.spacing(1.5),
  },
  headData: {
    color: theme.palette.text.primary,
  },
  tableDataStatus: {
    paddingLeft: theme.spacing(5),
  },
  progressBar: {
    width: '6.5rem',
  },
  steps: {
    marginLeft: theme.spacing(5.625),
  },
  workflowNameData: {
    maxWidth: '15.625rem',
    borderRight: `1px solid ${theme.palette.border.main}`,
    paddingLeft: theme.spacing(4),
  },
  targetCluster: {
    paddingLeft: theme.spacing(3.75),
    color: theme.palette.text.primary,
  },
  clusterName: {
    marginLeft: theme.spacing(4),
  },
  reliabiltyData: {
    width: '8.125rem',
  },
  stepsData: {
    paddingLeft: theme.spacing(5),
  },
  stepsDataTime: {
    paddingLeft: theme.spacing(7),
  },
  stepsDataschedule: {
    paddingLeft: theme.spacing(8),
  },
  optionBtn: {
    marginLeft: 'auto',
  },
  timeDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  success: {
    color: theme.palette.primary.dark,
  },
  iconButton: {
    width: '2rem',
    height: '2rem',
  },
  tableCell: {
    display: 'flex',
    flexDirection: 'row',
  },
  // Menu option with icon
  expDiv: {
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
  },
  btnImg: {
    width: '0.8125rem',
    height: '0.8125rem',
    marginTop: theme.spacing(0.375),
  },
  btnText: {
    paddingLeft: theme.spacing(1.625),
  },
  // date picker
  datePickerColor: {
    color: theme.palette.secondary.dark,
  },
  // Table status
  statusFont: {
    fontSize: '0.725rem',
  },
  // Delete Cluster Modal
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(7.5),
  },
  // styles for text
  text: {
    width: '31.93rem',
    height: '5.875rem',
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(3.75),
  },
  typo: {
    fontSize: '2rem',
  },
  textSecond: {
    width: '29.06rem',
    height: '1.6875rem',
    marginTop: theme.spacing(1.875),
    marginBottom: theme.spacing(3.75),
  },
  disconnectForever: {
    fontSize: '1rem',
    marginTop: theme.spacing(2),
  },
  // for yes or no buttons
  buttonGroup: {
    display: 'flex',
    marginTop: theme.spacing(2.5),
    justifyContent: 'space-between',
    gap: '1rem',
  },
  w7: { width: '7rem' },
  // delete user
  delDiv: {
    maxWidth: '8.56rem',
    display: 'flex',
    marginTop: theme.spacing(3),
    color: theme.palette.error.dark,
  },
  bin: {
    marginRight: theme.spacing(1.485),
  },
  otherTC: {
    maxWidth: '15.375rem',
  },
  deleteCluster: {
    display: 'flex',
    flexDirection: 'column',
  },
  error: {
    borderColor: theme.palette.error.main,
    '&:hover': {
      borderColor: theme.palette.error.main,
      boxShadow: '',
    },
    '&$focused': {
      backgroundColor: theme.palette.common.white,
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
    },
  },
  customTooltip: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.text.primary,
    fontSize: '0.775rem',
  },
}));

export default useStyles;
