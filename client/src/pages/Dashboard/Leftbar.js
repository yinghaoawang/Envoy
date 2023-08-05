import React, { useEffect, useState } from 'react';

// hooks
import { useRedux } from '../../hooks/index';
import PlaceholderSidebar from '../../components/PlaceholderSidebar';
import ProfileLeftbar from './Profile/ProfileLeftbar';
import ChannelsLeftbar from './Channels/ChannelsLeftbar';
import MessagesLeftbar from './Messages/MessagesLeftbar';

const ActiveLeftbarComponent = (props) => {
  const { activeTab, activeContent } = props;
  switch (activeTab?.title) {
    case 'Profile':
      return <ProfileLeftbar {...activeContent.props} />;
    case 'Channels':
      return <ChannelsLeftbar {...activeContent.props}></ChannelsLeftbar>;
    case 'Messages':
      return <MessagesLeftbar {...activeContent.props} />;
    case 'Settings':
      return <PlaceholderSidebar {...activeContent.props} />;
    default:
      return <></>;
  }
};

const Leftbar = (props) => {
  const { useAppSelector } = useRedux();
  const { activeTab, activeContent } = useAppSelector((state) => ({
    activeTab: state.Layout.activeTab,
    activeContent: state.Layout.activeContent
  }));

  return (
    <>
      {activeTab == null ? (
        <></>
      ) : (
        <div
          className='d-flex flex-column flex-shrink-0 p-3 text-white bg-gray-900 h-100 overflow-auto'
          style={{ width: '280px' }}
        >
          <ActiveLeftbarComponent
            activeContent={activeContent}
            activeTab={activeTab}
          />
        </div>
      )}
    </>
  );
};

export default Leftbar;
