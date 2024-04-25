// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import GroupsIcon from '@mui/icons-material/Groups';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

// constant
const icons = { IconBrandChrome, IconHelp, LibraryBooksIcon, CameraOutdoorIcon, GroupsIcon, RecentActorsIcon };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'library',
      title: 'Library',
      type: 'item',
      url: '/samplepage',
      icon: icons.LibraryBooksIcon,
      breadcrumbs: false
    },
    {
      id: 'seminarhalls',
      title: 'Seminar Halls',
      type: 'item',
      url: '/samplepage2',
      icon: icons.CameraOutdoorIcon,
      breadcrumbs: false
    },
    {
      id: 'meetinghalls',
      title: 'Meeting Halls',
      type: 'item',
      url: '/meetinghalls',
      icon: icons.GroupsIcon,
      breadcrumbs: false
    },
    {
      id: 'staffrooms',
      title: 'Staff Rooms',
      type: 'item',
      url: '/staffrooms',
      icon: icons.RecentActorsIcon,
      breadcrumbs: false
    },
    
  ]
};

export default other;
