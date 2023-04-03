import { inject, observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { NotificationStore } from '../../store/notificationStore';
import ToastContent from '../toast-content/toastContent';
import useStyles from './notifier.styles';

interface INotifierProps {
  notificationStore?: NotificationStore;
}

const Notifier = ({
  notificationStore
}: INotifierProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const storeDisplayed = (uuid: string) => {
    notificationStore!.addDisplayed(uuid);
  };

  const alerts = notificationStore!.alertNotifications;

  useMemo(() => {
    alerts.forEach(n => {
      if (notificationStore!.displayed.find(d => d === n.uuid) !== undefined)
        return;
      toast(
        () => (
          <ToastContent
            message={t(
              n.title,
              n.translateParam ? { param: n.translateParam } : undefined
            )}
            description={t(n.description)}
          />
        ),
        { type: n.type, className: classes[n.type] }
      );
      storeDisplayed(n.uuid);
    });
  }, [alerts]);

  return null;
};

export default inject('notificationStore')(observer(Notifier));
