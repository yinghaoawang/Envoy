import Welcome from '../../components/Welcome';
import { useRedux } from '../../hooks';

const ActiveContentComponent = (props) => {
  const { activeTab } = props;

  if (activeTab?.content?.component) return <activeTab.content.component />;
  return <Welcome />;
};

const Content = (props) => {
  const { useAppSelector } = useRedux();
  const { activeTab } = useAppSelector((state) => ({
    activeTab: state.Layout.activeTab
  }));

  return (
    <div className='w-100 bg-gray-800 align-items-center text-white overflow-auto'>
      <ActiveContentComponent activeTab={activeTab} />
    </div>
  );
};

export default Content;
