const Channels = (props) => {
  const { channel } = props;

  return (
    <div>
      <div>{channel.id}</div>
      <div>{channel.name}</div>
    </div>
  );
};

export default Channels;
