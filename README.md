# photovalic

<!-- for Build Error

LINK:- https://github.com/facebook/create-react-app/issues/10880



Change In Node_module Folder D:\tlsleadclone\30072022\node_modules\bootstrap\scss\mixins

Replace These Lines After:-

    margin-top: calc(-1 * var(--#{$variable-prefix}gutter-y)); // stylelint-disable-line function-disallowed-list
    margin-right: calc(-.5 * var(--#{$variable-prefix}gutter-x)); // stylelint-disable-line function-disallowed-list
    margin-left: calc(-.5 * var(--#{$variable-prefix}gutter-x)); // stylelint-disable-line function-disallowed-list


-->

<!--If a theme is improperly installed or exhibits faults

Step 1:- npm cache clean --force
Step 2:- Edit Your package.json File And your Package.json File Look Like This:-
------------------------------------------------------------------------------------

{
  "name": "Photoboltaic",
  "homepage": "/",
  "version": "1.0",
  "private": true,
  "dependencies": {
    "@casl/ability": "^5.4.3",
    "@casl/react": "^2.3.0",
    "@craco/craco": "^6.4.3",
    "@fullcalendar/core": "^5.11.0",
    "@fullcalendar/daygrid": "^5.11.0",
    "@fullcalendar/interaction": "^5.11.0",
    "@fullcalendar/list": "^5.11.0",
    "@fullcalendar/react": "^5.11.1",
    "@fullcalendar/timegrid": "^5.11.0",
    "@fullcalendar/timeline": "^5.11.0",
    "@hookform/resolvers": "^2.8.10",
    "@popperjs/core": "^2.11.3",
    "@reduxjs/toolkit": "^1.2.5",
    "animate.css": "4.1.1",
    "apexcharts": "^3.35.2",
    "apexcharts-clevision": "^3.28.5",
    "axios": "^0.27.2",
    "axios-mock-adapter": "^1.20.0",
    "bootstrap": "5.1.0",
    "bs-stepper": "1.7.0",
    "chart.js": "^3.7.1",
    "classnames": "2.3.1",
    "cleave.js": "1.6.0",
    "draft-js": "0.11.7",
    "draftjs-to-html": "0.9.1",
    "file-saver": "^2.0.5",
    "flatpickr": "^4.6.13",
    "history": "^5.3.0",
    "html-to-draftjs": "1.5.0",
    "i18next": "^21.8.2",
    "i18next-browser-languagedetector": "^6.1.4",
    "i18next-xhr-backend": "3.2.2",
    "jquery": "^3.6.0",
    "jsonwebtoken": "8.5.1",
    "moment": "^2.29.4",
    "nouislider": "^15.5.0",
    "nouislider-react": "^3.4.1",
    "postcss-rtl": "^1.5.0",
    "prismjs": "^1.28.0",
    "prop-types": "^15.8.1",
    "rc-input-number": "^7.3.4",
    "react": "^18.1.0",
    "react-apexcharts": "^1.4.0",
    "react-chartjs-2": "^4.1.0",
    "react-contexify": "5.0.0",
    "react-copy-to-clipboard": "^5.1.0",
    "react-country-flag": "^3.0.2",
    "react-data-table-component": "^7.5.2",
    "react-dom": "^18.1.0",
    "react-draft-wysiwyg": "^1.14.7",
    "react-dropzone": "^14.2.1",
    "react-feather": "~2.0.3",
    "react-flatpickr": "^3.10.12",
    "react-hook-form": "^7.31.1",
    "react-hot-toast": "2.2.0",
    "react-i18next": "^11.16.9",
    "react-paginate": "^8.1.3",
    "react-perfect-scrollbar": "^1.5.8",
    "react-player": "^2.10.1",
    "react-rating": "2.0.5",
    "react-redux": "^8.0.1",
    "react-router-dom": "^6.3.0",
    "react-scripts": "4.0.2",
    "react-select": "^5.3.2",
    "react-shepherd": "3.3.6",
    "react-slidedown": "^2.4.7",
    "react-sortablejs": "6.0.0",
    "react-toastify": "7.0.3",
    "reactstrap": "9.0.1",
    "recharts": "^2.1.9",
    "redux": "^4.2.0",
    "redux-debounced": "0.5.0",
    "redux-thunk": "^2.4.1",
    "sass": "^1.51.0",
    "screenfull": "5.0.2",
    "sortablejs": "^1.12.0",
    "styled-components": "^5.3.5",
    "sweetalert2": "^11.4.14",
    "sweetalert2-react-content": "^5.0.0",
    "swiper": "^8.1.5",
    "wnumb": "1.2.0",
    "xlsx": "^0.18.5",
    "yarn": "^1.22.18",
    "yup": "^0.32.11"
  },
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject",
    "format": "prettier --write \"src/**/*.js\"",
    "lint": "eslint src/**/*.js src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "devDependencies": {
    "@types/sortablejs": "^1.10.6",
    "eslint": "^7.15.2",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-react": "^7.29.4",
    "html-webpack-plugin": "^5.5.0",
    "prettier": "^2.6.2",
    "sass-loader": "^12.6.0",
    "webpack": "4.44.2",
    "webpack-cli": "4.0.0",
    "webpack-dev-middleware": "^5.3.3",
    "webpack-dev-server": "^3.11.0"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "resolutions": {

    "react-scripts/postcss-preset-env/postcss-custom-properties": "^10.0.0"
  }

}

Step 3:- npm install --legacy-peer-deps --force
Step 4:- npm run start OR npm start

-------------------------------------------------------------------------------------

 -->

 <!--  For disable strict mode
 
 Step 1:- Edit .eslintrc.js  Comment :- rules
 Step 2:- restart Your project

 -->
