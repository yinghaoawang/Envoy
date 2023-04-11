import React, { useEffect, useState } from 'react';

// hooks
import { useRedux } from '../../hooks/index';
import { useNavigate } from 'react-router-dom';

const ActiveLeftbarComponent = (props) => {
  const { useAppSelector } = useRedux();
  const { activeTab } = useAppSelector((state) => ({
    activeTab: state.Layout.activeTab
  }));

  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    if (activeTab?.leftbar?.component) {
      setActiveComponent(<activeTab.leftbar.component />);
    }
  }, [activeTab]);

  if (activeComponent == null) return 'welcome';

  return activeComponent;
}

const Leftbar = (props) => {
  // global store
  const { useAppSelector } = useRedux();

  const { activeTab, isUserLoggedOut } = useAppSelector((state) => ({
    activeTab: state.Layout.activeTab,
    isUserLoggedOut: state.Login.isUserLoggedOut
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedOut) navigate('/login');
  }, [isUserLoggedOut]);

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