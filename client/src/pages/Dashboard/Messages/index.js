import MessageContent from '../../../components/MessageContent';

const Message = (props) => {
  const { otherUser, messages } = props;

  return <MessageContent otherUser={otherUser} directMessages={messages} />;
};

export default Message;
