import {
  BsPersonCircle as ProfileIcon,
  BsPeople as PeopleIcon
} from 'react-icons/bs';

import { BsExplicitFill as LogoIcon } from 'react-icons/bs';

import { RiHashtag as ChannelsIcon } from 'react-icons/ri';

import { BiMessage as MessagesIcon } from 'react-icons/bi';

import { IoSettingsOutline as SettingsIcon } from 'react-icons/io5';
import Profile from '../pages/Dashboard/Profile';
import ProfileLeftbar from '../pages/Dashboard/Profile/ProfileLeftbar';
import Welcome from '../components/Welcome';
import MessagesLeftbar from '../pages/Dashboard/Messages/MessagesLeftbar';
import ChannelsLeftbar from '../pages/Dashboard/Channels/ChannelsLeftbar';
import SettingsLeftbar from '../pages/Dashboard/Settings/SettingsLeftbar';
import PeopleLeftbar from '../pages/Dashboard/People/PeopleLeftbar';

export const rootTab = {
  id: -1,
  icon: {
    component: LogoIcon,
    props: {
      size: 34
    }
  },
  content: {
    component: Welcome
  }
};

export const tabs = [
  {
    id: 1,
    title: 'Profile',
    icon: {
      component: ProfileIcon,
      props: {
        size: 26
      }
    },
    leftbar: {
      component: ProfileLeftbar
    },
    content: {
      component: Profile
    }
  },
  {
    id: 2,
    title: 'Channels',
    icon: {
      component: ChannelsIcon,
      props: {
        size: 28
      }
    },
    leftbar: {
      component: ChannelsLeftbar
    }
  },
  {
    id: 3,
    title: 'Messages',
    icon: {
      component: MessagesIcon,
      props: {
        size: 25
      }
    },
    leftbar: {
      component: MessagesLeftbar
    }
  },
  {
    id: 4,
    title: 'Settings',
    icon: {
      component: SettingsIcon,
      props: {
        size: 26
      }
    },
    leftbar: {
      component: SettingsLeftbar
    }
  }
];
