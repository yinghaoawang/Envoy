import React, { useEffect, useState } from 'react';

// hooks
import { useRedux } from '../../hooks/index';
import PlaceholderSidebar from '../../components/PlaceholderSidebar';
import ProfileLeftbar from './Profile/ProfileLeftbar';
import ChannelsLeftbar from './Channels/ChannelsLeftbar';
import MessagesLeftbar from './Messages/MessagesLeftbar';

const ActiveLeftbarComponent = (props) => {
  const { useAppSelector } = useRedux();
  const { activeContent } = useAppSelector((state) => ({
    activeContent: state.Layout.activeContent
  }));

  switch (activeContent?.title) {
    case 'Profile':
      return <ProfileLeftbar {...activeContent.props} />;
    case 'Channels':
      return <ChannelsLeftbar {...activeContent.props}></ChannelsLeftbar>;
    case 'Messages':
      return <MessagesLeftbar {...activeContent.props} />;
    case 'Settings':
      return <PlaceholderSidebar {...activeContent.props} />;
    default:
      return <PlaceholderSidebar />;
  }
};

const Leftbar = (props) => {
  return (
    <div
      className='d-flex flex-column flex-shrink-0 p-3 text-white bg-gray-900 h-100 overflow-auto'
      style={{ width: '280px' }}
    >
      <ActiveLeftbarComponent />
    </div>
  );
};

export default Leftbar;
