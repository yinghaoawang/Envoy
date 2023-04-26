import { useEffect } from 'react';
import MessageContent from '../../../components/MessageContent';
import { useRedux } from '../../../hooks';
import { loadDirectMessages } from '../../../redux/directMessages/actions';

const Message = (props) => {
  const otherUser = { id: 6, displayName: 'first' };
  const { dispatch, useAppSelector } = useRedux();
  const { allDirectMessages } = useAppSelector((state) => ({
    allDirectMessages: state.DirectMessage.directMessages
  }));
  const directMessages = allDirectMessages.filter(
    (dm) => dm.toUserId === otherUser.id || dm.fromUserId === otherUser.id
  );

  useEffect(() => {
    dispatch(loadDirectMessages());
  }, []);

  return (
    <MessageContent otherUser={otherUser} directMessages={directMessages} />
  );
};

export default Message;
