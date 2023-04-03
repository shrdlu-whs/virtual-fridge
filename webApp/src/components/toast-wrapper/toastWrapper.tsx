import clsx from 'clsx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { UiStateStore } from '../../store/uiStateStore';
import useStyles from './toastWrapper.styles';

interface IToastWrapper {
  uiStateStore?: UiStateStore;
}

const ToastWrapper = ({ uiStateStore }: IToastWrapper) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <ToastContainer
      className={clsx(classes.root, {
        [classes.authorized]: location.pathname !== '/signIn'
      })}
    />
  );
};

export default inject('uiStateStore')(observer(ToastWrapper));
