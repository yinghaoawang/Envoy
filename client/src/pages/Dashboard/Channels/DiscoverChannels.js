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
    <tr>
      <td>{channel.id}</td>
      <td>{channel.name}</td>
      <td>{channel.owner.displayName}</td>
      <td>{channel.users.length}</td>
      <td>
        <Moment fromNow={true}>{channel.createdAt}</Moment>
      </td>
      <td>
        {containsUser || userJoined ? (
          <button disabled={true} className='btn btn-secondary'>
            Joined
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={onClickJoinChannel}
            className='btn btn-success'
          >
            Join
          </button>
        )}
      </td>
    </tr>
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
    <div className='container p-4'>
      <h1>Discover Channels</h1>
      <table className='table text-white'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Users</th>
            <th>Created</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel, idx) => (
            <ChannelListItem key={idx} channel={channel} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscoverChannels;
