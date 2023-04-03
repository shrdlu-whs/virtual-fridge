import React, { ReactNode, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { UiStateStore } from '../../store/uiStateStore';
import DrawerWrapper from './drawerWrapper';

type DrawerWrapperContainerProps = {
  uiStateStore?: UiStateStore;
  children: ReactNode;
};

const DrawerWrapperContainer = ({ uiStateStore, children }: DrawerWrapperContainerProps) => {
  return (
    <DrawerWrapper
      navMenuOpen={uiStateStore!.isSiteNavOpen}
    >
      {children}
    </DrawerWrapper>
  );
};

export default inject('uiStateStore')(observer(DrawerWrapperContainer));
