import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // root
  root: {
    padding: theme.spacing(5),
  },

  // Class to be used when WorkflowInfo is in Bottom of DagreGraph.
  rootBottom: {
    backgroundColor: theme.palette.background.paper,
  },

  // Class to be used when WorkflowInfo is in Header of Nodes Table.
  rootHeader: {
    backgroundColor: theme.palette.cards.header,
  },

  // Header
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(2),
  },

  // Section divided into 4 parts in flex display.
  section: {
    display: 'flex',
  },

  // Division in 4 parts
  subSection: {
    width: '33.3%',
  },

  // Sub section division in 2 parts
  subCategorySection: {
    width: '50%',
  },

  // Sub Section Title
  subSectionTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },

  // Sub category Section Title
  subCategorySectionTitle: {
    color: theme.palette.text.disabled,
    fontSize: '1rem',
  },

  resiliencyScore: {
    color: theme.palette.highlight,
    fontSize: '1.5rem',
  },

  closeButton: {
    borderColor: theme.palette.border.main,
    float: 'right',
    height: '0.451rem',
  },
}));

export default useStyles;
