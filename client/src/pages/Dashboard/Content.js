import Welcome from '../../components/Welcome';
import { useRedux } from '../../hooks';

const ActiveContentComponent = (props) => {
  const { activeContent } = props;

  if (activeContent?.component)
    return <activeContent.component {...activeContent.props} />;
  return <Welcome />;
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
