import { Typography } from '@material-ui/core';
import { ButtonFilled, ButtonOutlined, Modal } from 'litmus-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';
// props for DelUser component
interface DelUserProps {
  handleModal?: () => void;
  tableDelete: boolean;
  handleTable: () => void;
  teammingDel: boolean;
  disabled?: boolean;
}

// DelUser displays the modal for deteing a user
const DelUser: React.FC<DelUserProps> = ({
  handleModal,
  tableDelete,
  teammingDel,
  handleTable,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const { t } = useTranslation();

  const handleClose = () => {
    handleTable();
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        modalActions={
          <ButtonOutlined onClick={handleClose}>&#x2715;</ButtonOutlined>
        }
      >
        <div className={classes.body}>
          <img src="./icons/userDel.svg" alt="lock" />
          <div className={classes.text}>
            <Typography className={classes.typo} align="center">
              {t('settings.teamingTab.deleteModal.header')}
              <strong> {t('settings.teamingTab.deleteModal.text')}</strong>
            </Typography>
          </div>
          <div className={classes.textSecond}>
            <Typography className={classes.typoSub} align="center">
              {teammingDel ? (
                <>{t('settings.teamingTab.deleteModal.body')}</>
              ) : (
                <>
                  {t(
                    'settings.userManagementTab.editUser.deleteUser.deleteModal.body'
                  )}
                </>
              )}
            </Typography>
          </div>
          <div className={classes.buttonGroup}>
            <ButtonOutlined
              onClick={() => {
                setOpen(false);
              }}
            >
              <> {t('settings.teamingTab.deleteModal.noButton')}</>
            </ButtonOutlined>

            <ButtonFilled onClick={tableDelete ? handleModal : handleClose}>
              <>{t('settings.teamingTab.deleteModal.yesButton')}</>
            </ButtonFilled>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default DelUser;
