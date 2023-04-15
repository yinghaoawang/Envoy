import { useEffect, useState } from 'react';
import channelsApi from '../../../api/channelsApi';
import { useRedux } from '../../../hooks';
import { switchContent } from '../../../redux/layout/actions';
import Channels from '.';

const ChannelListItem = (props) => {
  const { dispatch } = useRedux();
  const { channel } = props;
  const content = {
    component: Channels,
    props: {
      channel: channel
    }
  };
  return (
    <>
      <li className='py-3'>
        <a
          onClick={() => dispatch(switchContent(content))}
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
  useEffect(() => {
    channelsApi.getChannels().then((channels) => {
      setChannels(channels);
    });
  });

  return (
    <div>
      <h1>Channels</h1>
      <ul className='list-unstyled mb-0'>
        {channels.map((channel, idx) => (
          <ChannelListItem key={idx} channel={channel} />
        ))}
      </ul>
      <button>Discover new channels</button>
      <button>Create channel</button>
    </div>
  );
};

export default ChannelsLeftbar;
