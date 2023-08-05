import {
  BsPersonCircle as ProfileIcon,
  BsPeople as PeopleIcon
} from 'react-icons/bs';

import { BsExplicitFill as LogoIcon } from 'react-icons/bs';

import { RiHashtag as ChannelsIcon } from 'react-icons/ri';

import { BiMessage as MessagesIcon } from 'react-icons/bi';

import { IoSettingsOutline as SettingsIcon } from 'react-icons/io5';

export const rootTab = {
  id: -1,
  icon: {
    component: LogoIcon,
    props: {
      size: 34
    }
  },
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
    title: 'Settings',
    icon: {
      component: SettingsIcon,
      props: {
        size: 26
      }
    }
  }
];
