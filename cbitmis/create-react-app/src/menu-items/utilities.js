// assets
import { IconTypography, IconPalette, IconShadow } from '@tabler/icons-react';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ScienceIcon from '@mui/icons-material/Science';
// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  CorporateFareIcon,
  ScienceIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Departments',
  type: 'group',
  children: [
    
    {
      id: 'blocks',
      title: 'Blocks',
      type: 'collapse',
      icon: icons.CorporateFareIcon,
      children: [
        {
          id: 'block-a',
          title: 'A - Civil Engineering',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false,
          blockvalue:'A',
          deptvalue:'civil'
        },
        {
          id: 'block-b',
          title: 'B - Administrative Block',
          type: 'item',
          
          url: '/blocks/Bblock',
          breadcrumbs: false,
          
        },
        {
          id: 'block-c',
          title: 'C - CSE ',
          type: 'item',
          url: '/blocks/Cblock',
          breadcrumbs: false,
          
        },
        {
          id: 'block-g',
          title: 'G - Mechanical Laborataries',
          type: 'item',
          
          url: '/blocks/Gblock',
          breadcrumbs: false,
         
        },
        {
          id: 'block-h',
          title: 'H - Chemical Laborataries',
          type: 'item',
          
          url: '/blocks/Hblock',
          breadcrumbs: false,
          
        },
        {
          id: 'block-l',
          title: 'L - IT & EEE Block',
          type: 'item',
          
          url: '/blocks/Lblock',
          breadcrumbs: false
        },
        {
          id: 'block-m',
          title: 'M - Biotechnology & AI-DS Block',
          type: 'item',
         
          url: '/blocks/Mblock',
          breadcrumbs: false
        },
        {
          id: 'block-n',
          title: 'N - ECE Block',
          type: 'item',
          
          url: '/blocks/Nblock',
          breadcrumbs: false
        },
        {
          id: 'block-k',
          title: 'K - Chemical Engineering Block',
          type: 'item',
          
          url: '/blocks/Kblock',
          breadcrumbs: false
        },
        {
          id: 'block-sms',
          title: 'SMS Block',
          type: 'item',
          
          url: '/blocks/SMSblock/',
          breadcrumbs: false
        },
        {
          id: 'block-rnd',
          title: 'Research & Development Block',
          type: 'item',
         
          url: '/blocks/R&Dblock',
          breadcrumbs: false
        },
      ]
    },
    {
      id: 'labs',
      title: 'Laboratories',
      type: 'collapse',
      icon: icons.ScienceIcon,
      children: [
        {
          id: 'lab-phy',
          title: 'Physics',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'lab-che',
          title: 'Chemistry',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        },
        {
          id: 'lab-cse',
          title: 'CSE',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        },
        {
          id: 'lab-it',
          title: 'IT',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        },
        {
          id: 'lab-eng',
          title: 'English',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        },
        {
          id: 'lab-mech',
          title: 'Mechanical',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        },
        {
          id: 'lab-eee',
          title: 'EEE',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        },
        {
          id: 'lab-ece',
          title: 'ECE',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        },
        {
          id: 'lab-aids',
          title: 'AI & DS',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        },
        {
          id: 'lab-rnd',
          title: 'Research & Development',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        },
      ]
    }
  ],
  breadcrumbs: 'false',
  
};

export default utilities;
