import { useEffect, useRef, useState } from 'react';
import channelApi from '../../../api/channelApi';
import { useRedux } from '../../../hooks';
import { switchContent } from '../../../redux/layout/actions';
import Channels from '.';
import FormInput from '../../../components/FormInput';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../components/ErrorMessage';
import { createChannel, loadChannels } from '../../../redux/channel/actions';
import { FaHashtag as HashtagIcon } from 'react-icons/fa';
import DiscoverChannels from './DiscoverChannels';

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
    <li className='py-2'>
      <a
        onClick={onClickChannelListItem}
        href='#!'
        className='d-flex text-decoration-none align-items-center text-light hover-dim'
      >
        <HashtagIcon />
        <div className='ms-1'>{channel.name}</div>
      </a>
    </li>
  );
};

const CreateChannelForm = (props) => {
  const { dispatch, useAppSelector } = useRedux();
  const { register, handleSubmit, reset } = useForm();

  const { isLoading, channelError } = useAppSelector((state) => ({
    isLoading: state.Channel.loading,
    channelError: state.Channel.error
  }));

  const onSubmit = (data) => {
    if (isLoading) return;
    dispatch(createChannel(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput name='name' placeholder='Channel Name' register={register} />
      <button
        className='form-control btn btn-success mt-2'
        disabled={isLoading}
      >
        Create channel
      </button>
      <ErrorMessage message={channelError} />
    </form>
  );
};

const ChannelsLeftbar = (props) => {
  const { dispatch, useAppSelector } = useRedux();

  const { channels } = useAppSelector((state) => ({
    channels: state.Channel.channels
  }));

  useEffect(() => {
    dispatch(loadChannels());
  }, []);

  let firstRun = useRef(true);
  useEffect(() => {
    const openFirstChannel = () => {
      if (!firstRun.current) return;
      const firstChannel = channels?.[0];
      if (firstChannel == null) {
        const discoverChannelContent = {
          component: DiscoverChannels
        };
        dispatch(switchContent(discoverChannelContent));
        return;
      }
      const channelContent = {
        component: Channels,
        props: {
          channel: firstChannel
        }
      };
      dispatch(switchContent(channelContent));
      firstRun.current = false;
    };
    openFirstChannel();
  }, []);

  const onClickDiscoverChannels = () => {
    const discoverChannelContent = {
      component: DiscoverChannels
    };
    dispatch(switchContent(discoverChannelContent));
  };

  return (
    <div>
      <h1>Channels</h1>
      <ul className='list-unstyled mb-0'>
        {channels.map((channel, idx) => (
          <ChannelListItem key={idx} channel={channel} />
        ))}
      </ul>
      <button
        onClick={onClickDiscoverChannels}
        className='btn btn-primary mt-2'
      >
        Discover new channels
      </button>
      <CreateChannelForm />
    </div>
  );
};

export default ChannelsLeftbar;
