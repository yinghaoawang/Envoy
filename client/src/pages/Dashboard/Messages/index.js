import MessageContent from '../../../components/MessageContent';
import { useProfile, useRedux } from '../../../hooks';

const Message = (props) => {
  const { useAppSelector } = useRedux();
  const { userProfile } = useProfile();
  const { currentChat } = useAppSelector((state) => ({
    currentChat: state.DirectMessage.currentChat
  }));

  const otherUser = currentChat.users.find(u => u.user.id !== userProfile.id)?.user;

  return (
    <>
      {currentChat ? (
        <MessageContent
          otherUser={otherUser}
          directMessages={currentChat.messages}
        />
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Message;
