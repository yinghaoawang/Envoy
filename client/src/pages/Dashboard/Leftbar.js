import React, { useEffect, useState } from 'react';

// hooks
import { useRedux } from '../../hooks/index';
import PlaceholderSidebar from '../../components/PlaceholderSidebar';

const ActiveLeftbarComponent = (props) => {
  const { useAppSelector } = useRedux();
  const { activeTab } = useAppSelector((state) => ({
    activeTab: state.Layout.activeTab
  }));

  if (activeTab?.leftbar?.component == null) return <PlaceholderSidebar />;

  return <activeTab.leftbar.component />;
};

const Leftbar = (props) => {
  return (
    <div
      className='d-flex flex-column flex-shrink-0 p-3 text-white bg-gray-900 h-100'
      style={{ width: '280px' }}
    >
      <ActiveLeftbarComponent />
    </div>
  );
};

export default Leftbar;
