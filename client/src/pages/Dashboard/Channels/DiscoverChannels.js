import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import channelApi from '../../../api/channelApi';
import { useProfile, useRedux } from '../../../hooks';
import { loadChannels } from '../../../redux/channel/actions';

const ChannelListItem = (props) => {
  const { dispatch } = useRedux();
  const { channel } = props;
  const { userProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [userJoined, setUserJoined] = useState(false);

  const channelContainsUser = (channel) => {
    for (const user of channel.users) {
      if (user.userId === userProfile.id) {
        return true;
      }
    }
    return false;
  };

  const containsUser = channelContainsUser(channel);

  const onClickJoinChannel = () => {
    setLoading(true);
    channelApi.joinChannel({ channelId: channel.id }).then((channelData) => {
      setLoading(false);
      setUserJoined(true);
      dispatch(loadChannels());
    });
  };

  return (
    <div className='bg-gray-800 p-3'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex gap-4'>
          <div className='d-flex'>
            {channel.profileImgUrl ? (
              <img
                src={channel.profileImgUrl}
                className='rounded-circle avatar me-3'
                alt='avatar 3'
                style={{ width: '60px', height: '60px' }}
              />
            ) : (
              <div
                className='rounded-circle avatar me-3'
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#000022'
                }}
              >
                <div className='d-flex justify-content-center align-items-center h-100 text-white user-select-none'>{channel.name?.[0]?.toUpperCase()}</div>
              </div>
            )}
            <div className='my-auto' style={{ maxWidth: '100px' }}>
              <div className='fw-bold text-truncate'>{channel.name}</div>
              <div className='text-muted text-truncate'>{channel.users.length} users</div>
            </div>
          </div>
          <div className='my-auto text-truncate' style={{width: '100px' }}>
            {channel.owner.displayName}
          </div>
          <div className='my-auto'>
            Created <Moment fromNow={true}>{channel.createdAt}</Moment>
          </div>
        </div>
        <div className='my-auto'>
          <div style={{ width: '100px', height: '45px' }}>
            {containsUser || userJoined ? (
              <button disabled={true} className='btn btn-secondary w-100 h-100'>
                Joined
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={onClickJoinChannel}
                className='btn btn-success w-100 h-100'
              >
                Join
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DiscoverChannels = (props) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const loadDiscoverChannels = async () => {
      const channelsData = await channelApi.getDiscoverChannels();
      setChannels(channelsData);
    };
    loadDiscoverChannels();
  }, []);

  return (
    <div className='container p-4 text-white bg-gray-950'>
      <div>
        <div className='mb-4'>
          <h1>Discover Channels</h1>
        </div>
        <div className='text-white d-flex flex-column gap-3'>
          {channels.map((channel, idx) => (
            <ChannelListItem key={idx} channel={channel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverChannels;
