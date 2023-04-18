import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import channelApi from '../../../api/channelApi';
import { useProfile } from '../../../hooks';

const DiscoverChannels = (props) => {
  const [channels, setChannels] = useState([]);

  const { userProfile } = useProfile();

  useEffect(() => {
    const loadDiscoverChannels = async () => {
      const channelsData = await channelApi.getDiscoverChannels();
      setChannels(channelsData);
    };
    loadDiscoverChannels();
  }, []);

  return (
    <div className='container p-4   '>
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
          {channels.map((channel) => {
            const channelContainsUser = (channel) => {
              for (const user of channel.users) {
                if (user.userId === userProfile.id) {
                  return true;
                }
              }
              return false;
            };
            const containsUser = channelContainsUser(channel);
            console.log(channel.users);
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
                  {containsUser ? (
                    <button disabled={true} className='btn btn-secondary'>
                      Joined
                    </button>
                  ) : (
                    <button className='btn btn-success'>Join</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DiscoverChannels;
