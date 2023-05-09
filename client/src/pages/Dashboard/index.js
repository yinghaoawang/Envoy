import Leftbar from './Leftbar';
import Content from './Content';
import { useEffect } from 'react';
import { useProfile, useRedux } from '../../hooks';
import { setChats } from '../../redux/directMessages/actions';

const Dashboard = (props) => {
  const { dispatch, useAppSelector } = useRedux();
  const { userProfile } = useProfile();
  const { allDirectMessages, currentChat, chats } = useAppSelector((state) => ({
    allDirectMessages: state.DirectMessage.directMessages,
    chats: state.DirectMessage.chats,
    currentChat: state.DirectMessage.currentChat
  }));

  return (
    <div className='d-flex w-100'>
      <Leftbar></Leftbar>
      <Content />
    </div>
  );
};

export default Dashboard;
