// ** Icons Import
import { Edit, Copy, Circle, Box, Package, AlertTriangle, RotateCw, Server, Grid } from 'react-feather'

export default [
  {
    id: 'formsAndTable',
    title: 'Forms & Tables',
    icon: <Edit />,
    children: [
      {
        id: 'formElements',
        title: 'Form Elements',
        icon: <Copy />,
        children: [
          {
            id: 'input',
            title: 'Input',
            icon: <Circle />,
            navLink: '/forms/elements/input'
          },
          {
            id: 'inputGroup',
            title: 'Input Groups',
            icon: <Circle />,
            navLink: '/forms/elements/input-group'
          },
          {
            id: 'inputMask',
            title: 'Input Mask',
            icon: <Circle />,
            navLink: '/forms/elements/input-mask'
          },
          {
            id: 'textarea',
            title: 'Textarea',
            icon: <Circle />,
            navLink: '/forms/elements/textarea'
          },
          {
            id: 'checkbox',
            title: 'Checkbox',
            icon: <Circle />,
            navLink: '/forms/elements/checkbox'
          },
        
          {
            id: 'switch',
            title: 'Switch',
            icon: <Circle />,
            navLink: '/forms/elements/switch'
          },
          {
            id: 'select',
            title: 'Select',
            icon: <Circle />,
            navLink: '/forms/elements/select'
          },
          {
            id: 'numberInput',
            title: 'Number Input',
            icon: <Circle />,
            navLink: '/forms/elements/number-input'
          },
          {
            id: 'fileUploader',
            title: 'File Uploader',
            icon: <Circle />,
            navLink: '/forms/elements/file-uploader'
          },
          {
            id: 'quillEditor',
            title: 'Editor',
            icon: <Circle />,
            navLink: '/forms/elements/editor'
          },
          {
            id: 'date_&_timePicker',
            title: 'Date & Time Picker',
            icon: <Circle />,
            navLink: '/forms/elements/pickers'
          }
        ]
      },
      {
        id: 'formLayouts',
        title: 'Form Layout',
        icon: <Box />,
        navLink: '/forms/layout/form-layout'
      },
     
      
      {
        id: 'formRepeater',
        title: 'Form Repeater',
        icon: <RotateCw />,
        navLink: '/forms/form-repeater'
      },
      // {
      //   id: 'tablesReactstrap',
      //   title: 'Table',
      //   icon: <Server />,
      //   navLink: '/tables/reactstrap'
      // },
      // {
      //   id: 'dataTable',
      //   title: 'DataTable',
      //   icon: <Grid />,
      //   children: [
      //     {
      //       id: 'dtBasic',
      //       title: 'Basic',
      //       icon: <Circle />,
      //       navLink: '/datatables/basic'
      //     },
      //     {
      //       id: 'dtAdvance',
      //       title: 'Advanced',
      //       icon: <Circle />,
      //       navLink: '/datatables/advance'
      //     }
      //   ]
      // }
    ]
  }
]
