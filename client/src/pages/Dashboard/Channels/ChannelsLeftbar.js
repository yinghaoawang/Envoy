import { useEffect, useState } from 'react';
import channelApi from '../../../api/channelApi';
import { useRedux } from '../../../hooks';
import { switchContent } from '../../../redux/layout/actions';
import Channels from '.';
import FormInput from '../../../components/FormInput';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../components/ErrorMessage';
import { createChannel } from '../../../redux/channel/actions';

const ChannelListItem = (props) => {
  const { channel } = props;
  const { dispatch } = useRedux();

  const onClickChannelListItem = () => {
    const channelContent = {
      component: Channels,
      props: {
        channel: channel
      }
    };
    dispatch(switchContent(channelContent));
  };

  return (
    <>
      <li className='py-3'>
        <a
          onClick={onClickChannelListItem}
          href='#!'
          className='d-flex text-decoration-none align-items-center text-light hover-dim'
        >
          {channel.name}
        </a>
      </li>
      <hr className='m-0 p-0' />
    </>
  );
};

const ChannelsLeftbar = (props) => {
  const [channels, setChannels] = useState([]);
  const { dispatch, useAppSelector } = useRedux();
  useEffect(() => {
    channelApi.getChannels().then((channels) => {
      setChannels(channels);
    });
  }, []);
  const { isLoading, channelError } = useAppSelector((state) => ({
    isLoading: state.Channel.loading,
    channelError: state.Channel.error
  }));
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (isLoading) return;
    dispatch(createChannel(data));
    reset();
  };

  return (
    <div>
      <h1>Channels</h1>
      <ul className='list-unstyled mb-0'>
        {channels.map((channel, idx) => (
          <ChannelListItem key={idx} channel={channel} />
        ))}
      </ul>
      <button>Discover new channels</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput name='name' placeholder='Channel Name' register={register} />
        <button disabled={isLoading}>Create channel</button>
      </form>
      <ErrorMessage message={channelError} />
    </div>
  );
};

export default ChannelsLeftbar;
