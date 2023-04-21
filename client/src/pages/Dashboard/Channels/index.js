import MessageContent from '../../../components/MessageContent';

const Channels = (props) => {
  const { channel } = props;

  return <MessageContent channel={channel} />;
};

export default Channels;
