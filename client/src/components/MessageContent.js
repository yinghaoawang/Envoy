import Moment from 'react-moment';
import { FaPaperPlane as SendIcon, FaSmile as EmojiIcon } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { socketEmitEvent } from '../helpers/socketHelper';
import { useProfile, useRedux } from '../hooks';
import { switchContent } from '../redux/layout/actions';
import Profile from '../pages/Dashboard/Profile';

const MessageInput = (props) => {
  const { channel, otherUser } = props;
  const { userProfile } = useProfile();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const toggleEmojiClicker = () => {
    setIsEmojiPickerOpen((prev) => !prev);
  };

  const emojiTogglerRef = useRef();
  const emojiPickerRef = useRef();

  const closeEmojiClicker = (event) => {
    if (event?.target) {
      if (emojiTogglerRef.current?.contains(event.target)) return;
      if (emojiPickerRef.current?.contains(event.target)) return;
    }
    setIsEmojiPickerOpen(false);
  };

  const inputRef = useRef();

  const onEmojiClick = (data) => {
    closeEmojiClicker();
    if (inputRef.current) {
      inputRef.current.value = inputRef.current.value + data.emoji;
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeEmojiClicker);
    return () => {
      document.removeEventListener('click', closeEmojiClicker);
    };
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputRef.current.value === '') return;
    if (channel != null) {
      socketEmitEvent('channelMessage', {
        channel: {
          id: channel.id
        },
        message: inputRef.current.value
      });
    } else if (otherUser != null) {
      socketEmitEvent('directMessage', {
        to: {
          userId: otherUser.id
        },
        message: inputRef.current.value
      });
    } else {
      throw new Error(
        'Target (channel or other user) does not exist in submit message.'
      );
    }
    inputRef.current.value = '';
  };

  return (
    <form
      onSubmit={onSubmit}
      className='text-muted d-flex justify-content-start align-items-center py-3 pe-3 w-100'
    >
      <img
        src={
          userProfile.profileImgUrl ||
          'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
        }
        className='rounded-circle avatar me-2'
        alt='avatar 3'
        style={{ width: '40px', height: '40px' }}
      />
      <input
        ref={inputRef}
        type='text'
        className='form-control form-control-lg w-100 flex-grow-1'
        style={{ fontSize: '16px' }}
        placeholder='Type message'
      />
      <li ref={emojiTogglerRef} className='ms-3 text-muted' href='#!'>
        <EmojiIcon onClick={toggleEmojiClicker} size={22} />
      </li>
      <div>
        {isEmojiPickerOpen && (
          <div
            ref={emojiPickerRef}
            className='position-fixed d-flex justify-content-end'
            style={{ transform: 'translate(-100%, -100%) translate(0, -40px)' }}
          >
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              width={280}
              height={450}
              emojiStyle='google'
              theme='dark'
            />
          </div>
        )}
      </div>
      <a onClick={onSubmit} className='ms-3' href='#!'>
        <SendIcon size={22} />
      </a>
    </form>
  );
};

const MessageItem = (props) => {
  const { user, message } = props;
  const { dispatch } = useRedux();
  const onUserClick = () => {
    const profileContent = {
      component: Profile,
      props: {
        user
      }
    };
    dispatch(switchContent(profileContent));
  };
  return (
    <div className='d-flex flex-row justify-content-start'>
      <a onClick={onUserClick} href='#!'>
        <img
          src={
            user.profileImgUrl ||
            'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
          }
          className='rounded-circle avatar'
          alt='avatar 1'
          style={{ width: '40px', height: '40px' }}
        />
      </a>
      <div>
        <div className='small ms-3 mb-1'>
          <div className='flex'>
            <a href='#!' onClick={onUserClick} className='fw-bold text-white'>
              {user.displayName}
            </a>{' '}
            <Moment format='hh:mm A'>{message.createdAt}</Moment>
          </div>
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
};

const MessageContent = (props) => {
  const { channel, otherUser } = props;
  const messages = channel?.messages || props.directMessages;

  return (
    <div className='h-100'>
      <div className='col-md-12 h-100'>
        <div className='card bg-transparent h-100'>
          <div
            className='flex-shrink-0 d-flex align-items-center border-b'
            style={{ height: '70px' }}
          >
            <div className='px-3'>
              {channel != null ? channel.name : otherUser.displayName}
            </div>
          </div>
          <div className='card-body px-3 py-0 d-flex flex-column-reverse overflow-auto'>
            <div className='pe-3 '>
              {messages.map((messageData, idx) => {
                return (
                  <MessageItem
                    key={idx}
                    user={messageData.user || messageData.from}
                    message={messageData}
                  />
                );
              })}
            </div>
          </div>
          <div className='px-3'>
            <MessageInput {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
