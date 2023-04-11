import { useEffect, useState } from 'react';
import Welcome from '../../components/Welcome';
import { useRedux } from '../../hooks';

const ActiveContentComponent = (props) => {
  const { activeTab } = props;

  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    if (activeTab?.content?.component) setActiveComponent(activeTab.content.component);
  }, [activeTab]);

  if (activeComponent == null) return <Welcome />

  return activeComponent;
};

const Content = (props) => {
  const { useAppSelector } = useRedux();
  const { activeTab } = useAppSelector((state) => ({
    activeTab: state.Layout.activeTab
  }));

  return (
    <div className='w-100 bg-pattern-1 bg-gray-800 align-items-center text-white overflow-auto'>
      <ActiveContentComponent activeTab={activeTab} />
    </div>
  );
};

export default Content;
