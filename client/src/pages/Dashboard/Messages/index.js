import MessageContent from '../../../components/MessageContent';
import { useRedux } from '../../../hooks';

const Message = (props) => {
  const { useAppSelector } = useRedux();
  const { currentChat } = useAppSelector((state) => ({
    currentChat: state.DirectMessage.currentChat
  }));

  return (
    <>
      {currentChat ? (
        <MessageContent
          otherUser={currentChat.otherUser}
          directMessages={currentChat.messages}
        />
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Message;
