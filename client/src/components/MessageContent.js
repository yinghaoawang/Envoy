import Moment from 'react-moment';
import { FaPaperPlane as SendIcon, FaSmile as EmojiIcon } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';

const MessageInput = (props) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const openEmojiClicker = () => {
    setIsEmojiPickerOpen(true);
  };

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

  return (
    <div className='text-muted d-flex justify-content-start align-items-center py-3 pe-3 w-100'>
      <img
        src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp'
        alt='avatar 3'
        style={{ width: '40px', height: '100%' }}
      />
      <input
        ref={inputRef}
        type='text'
        className='form-control form-control-lg w-100 flex-grow-1'
        style={{ fontSize: '16px' }}
        id='exampleFormControlInput2'
        placeholder='Type message'
      />
      <a ref={emojiTogglerRef} className='ms-3 text-muted' href='#!'>
        <EmojiIcon onClick={toggleEmojiClicker} size={22} />
      </a>
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
      <a className='ms-3' href='#!'>
        <SendIcon size={22} />
      </a>
    </div>
  );
};

const MessageItem = (props) => {
  const { user, message } = props;
  return (
    <div className='d-flex flex-row justify-content-start'>
      <img
        src={user.profileImgUrl}
        alt='avatar 1'
        style={{ width: '45px', height: '100%' }}
      />
      <div>
        <div className='small ms-3 mb-1'>
          <div className='flex'>
            <span className='fw-bold'>{user.displayName}</span>{' '}
            <Moment format='hh:mm A'>{message.dateCreated}</Moment>
          </div>
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
};

const MessageContent = (props) => {

  const messages = [];

  return (
    <div className='h-100'>
      <div className='col-md-12 h-100'>
        <div className='card bg-transparent px-3 pt-3 h-100' id='chat3'>
          <div className='card-body p-0'>
            <div
              className='mt-auto pe-3'
              data-mdb-perfect-scrollbar='true'
            >
              {messages.map((messageData, idx) => {
                return (
                  <MessageItem
                    key={idx}
                    user={messageData.user}
                    message={messageData.message}
                  />
                );
              })}
            </div>
          </div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
