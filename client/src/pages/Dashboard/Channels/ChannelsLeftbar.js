import { useEffect, useRef, useState } from 'react';
import { useRedux } from '../../../hooks';
import { switchContent } from '../../../redux/layout/actions';
import Channels from '.';
import FormInput from '../../../components/FormInput';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../components/ErrorMessage';
import {
  createChannel,
  loadChannels,
  setCurrentChannel
} from '../../../redux/channel/actions';
import { FaHashtag as HashtagIcon } from 'react-icons/fa';
import DiscoverChannels from './DiscoverChannels';
import NoChannels from '../../../components/NoChannels';

const ChannelListItem = (props) => {
  const { channel, currentChannel, onChannelClick } = props;
  const isSelected = currentChannel != null && currentChannel.id === channel.id;
  return (
    <li>
      <a
        onClick={() => onChannelClick(channel)}
        href='#!'
        className={`py-2 px-2 hover-dim  d-flex text-light align-items-center
        ${isSelected ? 'bg-gray-700' : ''}`}
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

  const { channels, currentChannel, isLoading } = useAppSelector((state) => ({
    channels: state.Channel.channels,
    currentChannel: state.Channel.currentChannel,
    isLoading: state.Channel.loading
  }));

  useEffect(() => {
    dispatch(loadChannels());
  }, []);

  let firstRun = useRef(true);
  useEffect(() => {
    const openFirstChannel = () => {
      if (!firstRun.current || isLoading) return;
      const firstChannel = channels?.[0];
      if (firstChannel == null) {
        const noChannelsContent = {
          component: NoChannels
        };
        dispatch(switchContent(noChannelsContent));
        return;
      }
      onChannelClick(firstChannel);
      firstRun.current = false;
    };
    openFirstChannel();
  }, [channels]);

  const onChannelClick = (channel) => {
    dispatch(setCurrentChannel(channel));
    const channelContent = {
      component: Channels
    };
    dispatch(switchContent(channelContent));
  };

  const onClickDiscoverChannels = () => {
    const discoverChannelContent = {
      component: DiscoverChannels
    };
    dispatch(setCurrentChannel(null));
    dispatch(switchContent(discoverChannelContent));
  };

  return (
    <div className='d-flex flex-column h-100'>
      <h2>Channels</h2>
      <div className='overflow-auto'>
        <ul className='list-unstyled mb-0'>
          {channels.map((channel, idx) => (
            <ChannelListItem
              currentChannel={currentChannel}
              onChannelClick={onChannelClick}
              key={idx}
              channel={channel}
            />
          ))}
        </ul>
      </div>
      <div className='mt-auto'>
        <button
          onClick={onClickDiscoverChannels}
          className='btn btn-primary mt-2'
        >
          Discover new channels
        </button>
        <CreateChannelForm />
      </div>
    </div>
  );
};

export default ChannelsLeftbar;
