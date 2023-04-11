import Welcome from '../../components/Welcome';
import { useRedux } from '../../hooks';

const ActiveContentComponent = (props) => {
  const { useAppSelector } = useRedux();
  const { activeTab } = useAppSelector((state) => ({
    activeTab: state.Layout.activeTab
  }));
  switch (activeTab) {
    default:
      console.log(activeTab);
      return <Welcome />;
  }
};

const Content = (props) => {
  return (
    <div className='w-100 bg-pattern-1 bg-gray-800 align-items-center text-white'>
      <ActiveContentComponent />
    </div>
  );
};

export default Content;
