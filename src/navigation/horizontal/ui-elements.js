// ** Icons Import
import { Layers, Type, Eye, CreditCard, Circle, Briefcase, Box, Layout } from 'react-feather'

export default [
  {
    id: 'uiElements',
    title: 'User Interface',
    icon: <Layers />,
    children: [
      // {
      //   id: 'typography',
      //   title: 'Typography',
      //   icon: <Type />,
      //   navLink: '/ui-element/typography'
      // },
      {
        id: 'feather',
        title: 'Feather',
        icon: <Eye />,
        navLink: '/icons/reactfeather'
      },
      // {
      //   id: 'cards',
      //   title: 'Card',
      //   icon: <CreditCard />,
      //   badge: 'success',
      //   badgeText: 'New',
      //   children: [
      //     {
      //       id: 'basic',
      //       title: 'Basic',
      //       icon: <Circle />,
      //       navLink: '/cards/basic'
      //     },
      //     // {
      //     //   id: 'cardAdvance',
      //     //   title: 'Advance',
      //     //   icon: <Circle />,
      //     //   navLink: '/cards/advance'
      //     // },
      //     {
      //       id: 'cardStatistics',
      //       title: 'Statistics',
      //       icon: <Circle />,
      //       navLink: '/cards/statistics'
      //     },
      //     // {
      //     //   id: 'CardAnalytics',
      //     //   title: 'Analytics',
      //     //   icon: <Circle />,
      //     //   navLink: '/cards/analytics'
      //     // },
      //     {
      //       id: 'cardActions',
      //       title: 'Actions',
      //       icon: <Circle />,
      //       navLink: '/cards/action'
      //     }
      //   ]
      // },
      {
        id: 'components',
        title: 'Components',
        icon: <Briefcase />,
        children: [
          {
            id: 'accordion',
            title: 'Accordion',
            icon: <Circle />,
            navLink: '/components/accordion'
          },
     
          {
            id: 'autoComplete',
            title: 'Auto Complete',
            icon: <Circle />,
            navLink: '/components/auto-complete'
          },
          {
            id: 'avatar',
            title: 'Avatar',
            icon: <Circle />,
            navLink: '/components/avatar'
          },
          {
            id: 'badges',
            title: 'Badges',
            icon: <Circle />,
            navLink: '/components/badges'
          },
          
          {
            id: 'breadCrumbs',
            title: 'Breadcrumbs',
            icon: <Circle />,
            navLink: '/components/breadcrumbs'
          },
    
        
          
          {
            id: 'dropDowns',
            title: 'Dropdowns',
            icon: <Circle />,
            navLink: '/components/dropdowns'
          },
          {
            id: 'listGroup',
            title: 'List Group',
            icon: <Circle />,
            navLink: '/components/list-group'
          },
          {
            id: 'modals',
            title: 'Modals',
            icon: <Circle />,
            navLink: '/components/modals'
          },
          {
            id: 'navsComponent',
            title: 'Navs Component',
            icon: <Circle />,
            navLink: '/components/nav-component'
          },
          {
            id: 'offCanvas',
            title: 'OffCanvas',
            icon: <Circle size={12} />,
            navLink: '/components/offcanvas'
          },
          // {
          //   id: 'pagination',
          //   title: 'Pagination',
          //   icon: <Circle />,
          //   navLink: '/components/pagination'
          // },
          {
            id: 'pillBadges',
            title: 'Pill Badges',
            icon: <Circle />,
            navLink: '/components/pill-badges'
          },
          {
            id: 'pillsComponent',
            title: 'Pills Component',
            icon: <Circle />,
            navLink: '/components/pills-component'
          },
        
          
          {
            id: 'spinners',
            title: 'Spinner',
            icon: <Circle />,
            navLink: '/components/spinners'
          },
         
          
         
          
          // {
          //   id: 'tooltips',
          //   title: 'Tooltips',
          //   icon: <Circle />,
          //   navLink: '/components/tooltips'
          // }
        ]
      },
      // {
      //   id: 'extensions',
      //   title: 'Extensions',
      //   icon: <Box />,
      //   children: [
      //     {
      //       id: 'sweetAlert',
      //       title: 'Sweet Alert',
      //       icon: <Circle />,
      //       navLink: '/extensions/sweet-alert'
      //     },

      //     {
      //       id: 'toastr',
      //       title: 'Toastr',
      //       icon: <Circle />,
      //       navLink: '/extensions/toastr'
      //     },
      //     // {
      //     //   id: 'slider',
      //     //   title: 'Sliders',
      //     //   icon: <Circle />,
      //     //   navLink: '/extensions/slider'
      //     // },
      //     {
      //       id: 'drag_&_drop',
      //       title: 'Drag & Drop',
      //       icon: <Circle />,
      //       navLink: '/extensions/drag-and-drop'
      //     },
      //     // {
      //     //   id: 'tour',
      //     //   title: 'Tour',
      //     //   icon: <Circle />,
      //     //   navLink: '/extensions/tour'
      //     // },
      //     {
      //       id: 'clipBoard',
      //       title: 'Clipboard',
      //       icon: <Circle />,
      //       navLink: '/extensions/clipboard'
      //     },
      //     {
      //       id: 'reactPlayer',
      //       title: 'React Player',
      //       icon: <Circle />,
      //       navLink: '/extensions/react-player'
      //     },
      //     {
      //       id: 'contentMenu',
      //       title: 'Context Menu',
      //       icon: <Circle />,
      //       navLink: '/extensions/context-menu'
      //     },
      //     // {
      //     //   id: 'swiper',
      //     //   title: 'Swiper',
      //     //   icon: <Circle />,
      //     //   navLink: '/extensions/swiper'
      //     // },
      //     {
      //       id: 'ratings',
      //       title: 'Ratings',
      //       icon: <Circle />,
      //       navLink: '/extensions/ratings'
      //     },
      //     {
      //       id: 'i18n',
      //       title: 'I18n',
      //       icon: <Circle />,
      //       navLink: '/extensions/i18n'
      //     },
      //     {
      //       id: 'extPagination',
      //       title: 'React Paginate',
      //       icon: <Circle />,
      //       navLink: '/extensions/pagination'
      //     },
      //     {
      //       id: 'extImport',
      //       title: 'Import',
      //       icon: <Circle />,
      //       navLink: '/extensions/import'
      //     },
      //     {
      //       id: 'extExport',
      //       title: 'Export',
      //       icon: <Circle />,
      //       navLink: '/extensions/export'
      //     },
      //     // {
      //     //   id: 'extExportSelected',
      //     //   title: 'Export Selected',
      //     //   icon: <Circle />,
      //     //   navLink: '/extensions/export-selected'
      //     // }
      //   ]
      // },
    ]
  }
]
