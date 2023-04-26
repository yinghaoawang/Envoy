import MessageContent from '../../../components/MessageContent';
import { useRedux } from '../../../hooks';

const Channels = (props) => {
  const { useAppSelector } = useRedux();
  const { currentChannel } = useAppSelector((state) => ({
    currentChannel: state.Channel.currentChannel
  }));

  return (
    <>
      {currentChannel ? <MessageContent channel={currentChannel} /> : 'Loading'}
    </>
  );
};

export default Channels;
