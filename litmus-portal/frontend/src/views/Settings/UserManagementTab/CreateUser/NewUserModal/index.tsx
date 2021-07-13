import { useMutation } from '@apollo/client';
import { Typography } from '@material-ui/core';
import { ButtonFilled, ButtonOutlined, Modal } from 'litmus-ui';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../../../../../components/Loader';
import config from '../../../../../config';
import { CREATE_USER } from '../../../../../graphql';
import { CreateUserData } from '../../../../../models/graphql/user';
import { getToken } from '../../../../../utils/auth';
import useStyles from './styles';

// Props for NewUserModal component
interface NewUserModalProps {
  showModal: boolean;
  username: string;
  password: string;
  name: string;
  email: string;
  handleDiv: () => void;
}

// NewUserModal displays a modal on creating a new user
const NewUserModal: React.FC<NewUserModalProps> = ({
  username,
  password,
  name,
  email,
  handleDiv,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const role = 'user';
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState<string>('');

  const handleClose = () => {
    setOpen(false);
    handleDiv();
  };

  const [CreateUser] = useMutation<CreateUserData>(CREATE_USER, {
    onError: (err) => {
      console.error(err);
    },
    onCompleted: () => {
      setLoading(false);
      setOpen(true);
      setError('');
    },
  });

  const handleOpen = () => {
    setLoading(true);
    fetch(`${config.auth.url}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ email, username, name, password, role }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if ('error' in data) {
          setError(data.error_description as string);
          setLoading(false);
          setOpen(true);
        } else {
          CreateUser({
            variables: {
              user: {
                username,
                email,
                name,
                role: 'user',
                userID: data._id,
              },
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message as string);
        setLoading(false);
        setOpen(true);
      });
  };

  return (
    <div>
      <div data-cy="createNewUserButton">
        <ButtonFilled
          disabled={!(username.length > 0 && password.length > 0 && !loading)}
          onClick={handleOpen}
        >
          {loading ? (
            <div>
              <Loader size={20} />
            </div>
          ) : (
            <>
              {t(
                'settings.userManagementTab.createUser.newUserModal.button.create'
              )}
            </>
          )}
        </ButtonFilled>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        modalActions={
          <ButtonOutlined onClick={handleClose}>&#x2715;</ButtonOutlined>
        }
      >
        {error.length ? (
          <div className={classes.errDiv}>
            {/* <img src="./icons/checkmark.svg" alt="checkmark" /> */}

            <div className={classes.textError}>
              <Typography className={classes.typo} align="center">
                <strong>
                  {t(
                    'settings.userManagementTab.createUser.newUserModal.error'
                  )}
                </strong>{' '}
                {t(
                  'settings.userManagementTab.createUser.newUserModal.headerErr'
                )}
              </Typography>
            </div>
            <div className={classes.textSecondError}>
              <Typography className={classes.typoSub}>
                {t('settings.userManagementTab.createUser.newUserModal.error')}:{' '}
                {error}
              </Typography>
            </div>
            <div data-cy="newUserDoneButton" className={classes.buttonModal}>
              <ButtonFilled onClick={handleClose}>
                <>
                  {t(
                    'settings.userManagementTab.createUser.newUserModal.button.done'
                  )}
                </>
              </ButtonFilled>
            </div>
          </div>
        ) : (
          <div className={classes.body}>
            <img src="./icons/checkmark.svg" alt="checkmark" />
            <div className={classes.text}>
              <Typography className={classes.typo} align="center">
                {t('settings.userManagementTab.createUser.newUserModal.header')}{' '}
                <strong>{name}</strong>{' '}
                {t(
                  'settings.userManagementTab.createUser.newUserModal.headerInfo'
                )}
              </Typography>
            </div>
            <div className={classes.textSecond}>
              <Typography className={classes.typoSub}>
                {t('settings.userManagementTab.createUser.newUserModal.info')}
              </Typography>
            </div>
            <div data-cy="newUserDoneButton" className={classes.buttonModal}>
              <ButtonFilled onClick={handleClose}>
                <>
                  {t(
                    'settings.userManagementTab.createUser.newUserModal.button.done'
                  )}
                </>
              </ButtonFilled>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default NewUserModal;
