import Welcome from '../../components/Welcome';
import { useRedux } from '../../hooks';
import Channels from './Channels';
import Messages from './Messages';
import Profile from './Profile';

const ActiveContentComponent = (props) => {
  const { activeContent } = props;
  if (activeContent == null) return <></>;

  const getContentFromTitle = () => {
    switch (activeContent.title) {
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

  const getContentFromComponent = () => {
    return <activeContent.component {...activeContent.props} />
  }

  if (activeContent.title != null) {
    return getContentFromTitle();
  } else if (activeContent.component != null) {
    return getContentFromComponent();
  } else {
    throw new Error('Active content does not have a title or component');
  }
};

const Content = (props) => {
  const { useAppSelector } = useRedux();
  const { activeContent } = useAppSelector((state) => ({
    activeContent: state.Layout.activeContent
  }));

  return (
    <div className='w-100 bg-gray-800 align-items-center text-white overflow-auto'>
      <ActiveContentComponent activeContent={activeContent} />
    </div>
  );
};

export default Content;
