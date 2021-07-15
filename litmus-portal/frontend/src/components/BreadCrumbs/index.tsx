import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import * as React from 'react';
import { Link } from 'react-router-dom';
import capitalize from '../../utils/capitalize';
import { getProjectID, getProjectRole } from '../../utils/getSearchParams';
import useStyles from './styles';

const Breadcrumb: React.FC = () => {
  const pathname: string[] = window.location.pathname
    .replace(process.env.PUBLIC_URL, '')
    .split('/');
  let intermediateRoutes = '/';
  const classes = useStyles();
  const projectID = getProjectID();
  const projectRole = getProjectRole();

  return (
    <Breadcrumbs className={classes.breadCrumb}>
      {pathname.map((path) => {
        if (path) {
          intermediateRoutes += path;
          if (
            pathname[2] === 'schedule' &&
            (path === pathname[3] || path === pathname[4])
          ) {
            return <span key="schedule">{path}</span>;
          }
          const link = (
            <Link
              key={path}
              to={{
                pathname: intermediateRoutes,
                search: `?projectID=${projectID}&projectRole=${projectRole}`,
              }}
            >
              {capitalize(decodeURI(path))}
            </Link>
          );
          intermediateRoutes += '/';
          return link;
        }
        return '';
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
