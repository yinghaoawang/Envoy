import {
  BsPersonCircle as ProfileIcon,
  BsPeople as FriendsIcon,
} from 'react-icons/bs';

import {
  RiHashtag as ChannelsIcon,
} from 'react-icons/ri';

import {
  BiMessage as MessagesIcon,
} from 'react-icons/bi';

import {
  IoSettingsOutline as SettingsIcon,
} from 'react-icons/io5';
import Profile from '../pages/Dashboard/Profile';
import ProfileLeftbar from '../pages/Dashboard/Profile/ProfileLeftbar';

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
      component: ProfileLeftbar,
    },
    content: {
      component: Profile
    },
  },
  {
    id: 2,
    title: 'Channels',
    icon: {
      component: ChannelsIcon,
      props: {
        size: 28
      }
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
    }
  },
  {
    id: 4,
    title: 'Friends',
    icon: {
      component: FriendsIcon,
      props: {
        size: 24
      }
    }
  },
  {
    id: 5,
    title: 'Settings',
    icon: {
      component: SettingsIcon,
      props: {
        size: 26
      }
    }
  },
];