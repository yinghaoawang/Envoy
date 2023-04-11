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

export const tabs = [
  {
    id: 1,
    title: 'Profile',
    icon: {
      component: ProfileIcon,
      size: 26
    }
  },
  {
    id: 2,
    title: 'Channels',
    icon: {
      component: ChannelsIcon,
      size: 28
    }
  },
  {
    id: 3,
    title: 'Messages',
    icon: {
      component: MessagesIcon,
      size: 25
    }
  },
  {
    id: 4,
    title: 'Friends',
    icon: {
      component: FriendsIcon,
      size: 24
    }
  },
  {
    id: 5,
    title: 'Settings',
    icon: {
      component: SettingsIcon,
      size: 26
    }
  },
];