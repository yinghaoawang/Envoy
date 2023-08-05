import Welcome from '../../components/Welcome';
import { useRedux } from '../../hooks';
import Channels from './Channels';
import Messages from './Messages';
import Profile from './Profile';

const ActiveContentComponent = (props) => {
  const { activeContent } = props;
  console.log(activeContent);
  switch (activeContent?.title) {
    case 'Profile':
      return <Profile {...activeContent.props} />;
    case 'Channels':
      return <Channels {...activeContent.props} />;
    case 'Messages':
      return <Messages {...activeContent.props} />;
    case 'Settings':
      return <Welcome {...activeContent.props} />;
    default:
      return <Welcome />;
  }
};

const Content = (props) => {
  const { useAppSelector } = useRedux();
  const { activeContent } = useAppSelector((state) => ({
    activeContent: state.Layout.activeContent
  }));
  console.log(activeContent);

  return (
    <div className='w-100 bg-gray-800 align-items-center text-white overflow-auto'>
      <ActiveContentComponent activeContent={activeContent} />
    </div>
  );
};

export default Content;
