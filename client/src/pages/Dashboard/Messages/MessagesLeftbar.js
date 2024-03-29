import { useEffect, useRef } from 'react';
import { useProfile, useRedux } from '../../../hooks';
import {
  loadChats,
  setCurrentChat
} from '../../../redux/directMessages/actions';
import Messages from '.';
import { switchContent } from '../../../redux/layout/actions';
import NoFriends from '../../../components/NoFriends';
import moment from 'moment';

const MessageListItem = (props) => {
  const { chat, onChatClick, currentChat } = props;
  const { userProfile } = useProfile();
  const otherUser = chat.users.find(u => u.user.id !== userProfile.id)?.user;
  const unreadMessageCount = 0;
  const isSelected = currentChat != null && currentChat.id === chat.id;
  return (
    <li>
      <a
        onClick={() => onChatClick(chat)}
        href='#!'
        className={`d-flex py-2 px-2 align-items-center text-light hover-dim ${
          isSelected ? 'bg-gray-700' : ''
        }`}
      >
        <div
          className='d-flex flex-row'
          style={{ width: unreadMessageCount > 0 ? '90%' : '100%' }}
        >
          <div className='me-3'>
            <img
              src={
                otherUser.profileImgUrl ||
                'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
              }
              alt='avatar'
              className='avatar'
              width='40'
              height='40'
            />
            <span className='badge bg-success badge-dot'></span>
          </div>
          <div className='overflow-hidden my-auto me-3'>
            <p className='fw-bold mb-0 text-truncate'>
              {otherUser.displayName}
            </p>
            {otherUser.status && (
              <p className='small mb-0 text-truncate'>{otherUser.status}</p>
            )}
          </div>
        </div>
        {unreadMessageCount > 0 && (
          <div>
            <span className='badge bg-danger rounded-pill float-end'>
              {unreadMessageCount}
            </span>
          </div>
        )}
      </a>
    </li>
  );
};

const MessagesLeftbar = (props) => {
  const { dispatch, useAppSelector } = useRedux();
  const { currentChat, chats } = useAppSelector((state) => ({
    allDirectMessages: state.DirectMessage.directMessages,
    chats: state.DirectMessage.chats,
    currentChat: state.DirectMessage.currentChat
  }));

  useEffect(() => {
    dispatch(loadChats());
  }, []);

  let firstRun = useRef(true);
  useEffect(() => {
    const openFirstChannel = () => {
      if (!firstRun.current) return;
      const firstChat = chats?.[0];
      if (firstChat == null) {
        const discoverChannelContent = {
          component: NoFriends
        };
        dispatch(switchContent(discoverChannelContent));
        return;
      }
      onChatClick(firstChat);
      firstRun.current = false;
    };
    openFirstChannel();
  }, [chats]);

  const onChatClick = (chat) => {
    dispatch(setCurrentChat(chat));
    const chatContent = {
      component: Messages
    };
    dispatch(switchContent(chatContent));
  };

  const sortedChats = chats.sort((a, b) => -moment(a.updatedAt).diff(b.updatedAt));

  return (
    <div className='col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 w-100'>
      <div className=''>
        <div className='input-group rounded mb-1'>
          <input
            type='search'
            className='form-control rounded'
            placeholder='Search'
            aria-label='Search'
            aria-describedby='search-addon'
          />
        </div>

        <div>
          <ul className='list-unstyled mb-0'>
            {sortedChats.map((chat, idx) => (
              <MessageListItem
                key={idx}
                chat={chat}
                onChatClick={onChatClick}
                currentChat={currentChat}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessagesLeftbar;
