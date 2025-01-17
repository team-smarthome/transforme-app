import { combinedSafelist } from './safelist';

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  safelist: combinedSafelist,
  theme: {
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
    },
    screens: {
      '2xsm': '375px',
      xsm: '425px',
      '3xl': '2000px',
      ...defaultTheme.screens,
    },
    extend: {
      container: {
        zIndex: {
          '79': "79",
          '80': "80",
          '81': "81",
          '82': "82",
          '83': "83",
          '90': "90",
        },
        center: true,
        padding: {
          DEFAULT: '16px',

          // lg: '80px',
          // top: '16px',

        },
        aspectRatio: {
          '2/7': '2 / 7',
          '4/3': '4 / 3',
          '40/20': '40 / 20',
          '6 /3': '6  / 3',
          '16/9': '16 / 9',
          '23/13': '23 / 13',
          '400': '400',
          '800': '800',
          '1 /1': '1  /  1',
          '2 /1': '2  /  1',
          '3 /1': '3  /  1',
          '4 /1': '4  /  1',
          '5 /1': '5  /  1',
          '6 /1': '6  /  1',
          '7 /1': '7  /  1',
          '8 /1': '8  /  1',
          '9 /1': '9  /  1',
          '10 /1': '10  /  1',
          '2 /2': '2  /  2',
          '3 /2': '3  /  2',
          '4 /2': '4  /  2',
          '5 /2': '5  /  2',
          '6 /2': '6  /  2',
          '7 /2': '7  /  2',
          '8 /2': '8  /  2',
          '9 /2': '9  /  2',
          '10 /2': '10  /  2',
          '3 /3': '3  /  3',
          '4 /3': '4  /  3',
          '5 /3': '5  /  3',
          '6 /3': '6  /  3',
          '7 /3': '7  /  3',
          '8 /3': '8  /  3',
          '9 /3': '9  /  3',
          '10 /3': '10  /  3',
          '4 /4': '4  /  4',
          '5 /4': '5  /  4',
          '6 /4': '6  /  4',
          '7 /4': '7  /  4',
          '8 /4': '8  /  4',
          '9 /4': '9  /  4',
          '10 /4': '10  /  4',
          '5 /5': '5  /  5',
          '6 /5': '6  /  5',
          '7 /5': '7  /  5',
          '8 /5': '8  /  5',
          '9 /5': '9  /  5',
          '10 /5': '10  /  5',
          '6 /6': '6  /  6',
          '7 /6': '7  /  6',
          '8 /6': '8  /  6',
          '9 /6': '9  /  6',
          '10 /6': '10  /  6',
          '7 /7': '7  /  7',
          '8 /7': '8  /  7',
          '9 /7': '9  /  7',
          '10 /7': '10  /  7',
          '8 /8': '8  /  8',
          '9 /8': '9  /  8',
          '10 /8': '10  /  8',
          '9 /9': '9  /  9',
          '10 /9': '10  /  9',
          '10 /10': '10  /  10',
          1: '1',
          2: '2',
          3: '3',
          4: '4',
          5: '5',
          6: '6',
          7: '7',
          8: '8',
          9: '9',
          10: '10',
          11: '11',
          12: '12',
          13: '13',
          14: '14',
          15: '15',
          16: '16',
          17: '17',
          18: '18',
          19: '19',
          20: '20',
          21: '21',
          22: '22',
          23: '23',
          24: '24',
          25: '25',
          26: '26',
          27: '27',
          28: '28',
          29: '29',
          30: '30',
          31: '31',
          32: '32',
          33: '33',
          34: '34',
          35: '35',
          36: '36',
          37: '37',
          38: '38',
          39: '39',
          40: '40',
          41: '41',
          42: '42',
          43: '43',
          44: '44',
          45: '45',
          46: '46',
          47: '47',
          48: '48',
          49: '49',
          50: '50',
          51: '51',
          52: '52',
          53: '53',
          54: '54',
          55: '55',
          56: '56',
          57: '57',
          58: '58',
          59: '59',
          60: '60',
          61: '61',
          62: '62',
          63: '63',
          64: '64',
          65: '65',
          66: '66',
          67: '67',
          68: '68',
          69: '69',
          70: '70',
          71: '71',
          72: '72',
          73: '73',
          74: '74',
          75: '75',
          76: '76',
          77: '77',
          78: '78',
          79: '79',
          80: '80',
          81: '81',
          82: '82',
          83: '83',
          84: '84',
          85: '85',
          86: '86',
          87: '87',
          88: '88',
          89: '89',
          90: '90',
          91: '91',
          92: '92',
          93: '93',
          94: '94',
          95: '95',
          96: '96',
          97: '97',
          98: '98',
          99: '99',
          100: '100',
          101: '101',
          102: '102',
          103: '103',
          104: '104',
          105: '105',
          106: '106',
          107: '107',
          108: '108',
          109: '109',
          110: '110',
          111: '111',
          112: '112',
          113: '113',
          114: '114',
          115: '115',
          116: '116',
          117: '117',
          118: '118',
          119: '119',
          120: '120',
          121: '121',
          122: '122',
          123: '123',
          124: '124',
          125: '125',
          126: '126',
          127: '127',
          128: '128',
          129: '129',
          130: '130',
          131: '131',
          132: '132',
          133: '133',
          134: '134',
          135: '135',
          136: '136',
          137: '137',
          138: '138',
          139: '139',
          140: '140',
          141: '141',
          142: '142',
          143: '143',
          144: '144',
          145: '145',
          146: '146',
          147: '147',
          148: '148',
          149: '149',
          150: '150',
          151: '151',
          152: '152',
          153: '153',
          154: '154',
          155: '155',
          156: '156',
          157: '157',
          158: '158',
          159: '159',
          160: '160',
          161: '161',
          162: '162',
          163: '163',
          164: '164',
          165: '165',
          166: '166',
          167: '167',
          168: '168',
          169: '169',
          170: '170',
          171: '171',
          172: '172',
          173: '173',
          174: '174',
          175: '175',
          176: '176',
          177: '177',
          178: '178',
          179: '179',
          180: '180',
          181: '181',
          182: '182',
          183: '183',
          184: '184',
          185: '185',
          186: '186',
          187: '187',
          188: '188',
          189: '189',
          190: '190',
          191: '191',
          192: '192',
          193: '193',
          194: '194',
          195: '195',
          196: '196',
          197: '197',
          198: '198',
          199: '199',
          200: '200'

        },
      },
      colors: {
        'blue-location': '#1C71E3',
        'green-location': '#34A853',
        current: 'currentColor',
        transparent: 'transparent',
        white: '#FFFFFF',
        black: '#1C2434',
        'black-2': '#010101',
        body: '#64748B',
        bodydark: '#AEB7C0',
        bodydark1: '#DEE4EE',
        bodydark2: '#8A99AF',
        'transparent-light': '#ffffffaa',
        'transparent-dark': '#8A99AF44',
        'transparent-dark1': '#00000088',
        'transparent-dark2': '#00000055',
        primary: '#3C50E0',
        secondary: '#80CAEE',
        stroke: '#E2E8F0',
        gray: '#EFF4FB',
        graydark: '#333A48',
        'gray-2': '#F7F9FC',
        'gray-3': '#FAFAFA',
        whiten: '#F1F5F9',
        whiter: '#F5F7FD',
        boxdark: '#24303F',
        'boxdark-2': '#1A222C',
        strokedark: '#2E3A47',
        'form-strokedark': '#3d4d60',
        'form-input': '#1d2a39',
        'meta-1': '#DC3545',
        'meta-2': '#EFF2F7',
        'meta-3': '#10B981',
        'meta-4': '#313D4A',
        'meta-5': '#259AE6',
        'meta-6': '#FFBA00',
        'meta-7': '#FF6766',
        'meta-8': '#F0950C',
        'meta-9': '#E5E7EB',
        success: '#219653',
        danger: '#D34053',
        warning: '#FFA70B',
      },
      fontSize: {
        'title-xxl': ['44px', '55px'],
        'title-xl': ['36px', '45px'],
        'title-xl2': ['33px', '45px'],
        'title-lg': ['28px', '35px'],
        'title-md': ['24px', '30px'],
        'title-md2': ['26px', '30px'],
        'title-sm': ['20px', '26px'],
        'title-xsm': ['18px', '24px'],
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
        10.5: '2.625rem',
        11: '2.75rem',
        11.5: '2.875rem',
        12.5: '3.125rem',
        13: '3.25rem',
        13.5: '3.375rem',
        14: '3.5rem',
        14.5: '3.625rem',
        15: '3.75rem',
        15.5: '3.875rem',
        16: '4rem',
        16.5: '4.125rem',
        17: '4.25rem',
        17.5: '4.375rem',
        18: '4.5rem',
        18.5: '4.625rem',
        19: '4.75rem',
        19.5: '4.875rem',
        21: '5.25rem',
        21.5: '5.375rem',
        22: '5.5rem',
        22.5: '5.625rem',
        24.5: '6.125rem',
        25: '6.25rem',
        25.5: '6.375rem',
        26: '6.5rem',
        27: '6.75rem',
        27.5: '6.875rem',
        29: '7.25rem',
        29.5: '7.375rem',
        30: '7.5rem',
        31: '7.75rem',
        32.5: '8.125rem',
        34: '8.5rem',
        34.5: '8.625rem',
        35: '8.75rem',
        36.5: '9.125rem',
        37.5: '9.375rem',
        39: '9.75rem',
        39.5: '9.875rem',
        40: '10rem',
        42.5: '10.625rem',
        44: '11rem',
        45: '11.25rem',
        46: '11.5rem',
        47.5: '11.875rem',
        49: '12.25rem',
        50: '12.5rem',
        52: '13rem',
        52.5: '13.125rem',
        54: '13.5rem',
        54.5: '13.625rem',
        55: '13.75rem',
        55.5: '13.875rem',
        59: '14.75rem',
        60: '15rem',
        62.5: '15.625rem',
        65: '16.25rem',
        67: '16.75rem',
        67.5: '16.875rem',
        70: '17.5rem',
        72.5: '18.125rem',
        73: '18.25rem',
        75: '18.75rem',
        90: '22.5rem',
        94: '23.5rem',
        95: '23.75rem',
        100: '25rem',
        115: '28.75rem',
        125: '31.25rem',
        132.5: '33.125rem',
        150: '37.5rem',
        171.5: '42.875rem',
        180: '45rem',
        187.5: '46.875rem',
        203: '50.75rem',
        230: '57.5rem',
        242.5: '60.625rem',
      },
      maxWidth: {
        2.5: '0.625rem',
        3: '0.75rem',
        4: '1rem',
        11: '2.75rem',
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        22.5: '5.625rem',
        25: '6.25rem',
        30: '7.5rem',
        34: '8.5rem',
        35: '8.75rem',
        40: '10rem',
        42.5: '10.625rem',
        44: '11rem',
        45: '11.25rem',
        70: '17.5rem',
        90: '22.5rem',
        94: '23.5rem',
        125: '31.25rem',
        132.5: '33.125rem',
        142.5: '35.625rem',
        150: '37.5rem',
        180: '45rem',
        203: '50.75rem',
        230: '57.5rem',
        242.5: '60.625rem',
        270: '67.5rem',
        280: '70rem',
        292.5: '73.125rem',
      },
      maxHeight: {
        35: '8.75rem',
        70: '17.5rem',
        90: '22.5rem',
        550: '34.375rem',
        300: '18.75rem',
      },
      minWidth: {
        22.5: '5.625rem',
        42.5: '10.625rem',
        47.5: '11.875rem',
        75: '18.75rem',
      },
      zIndex: {
        999999: '999999',
        99999: '99999',
        9999: '9999',
        999: '999',
        99: '99',
        9: '9',
        1: '1',
      },
      opacity: {
        65: '.65',
      },
      backgroundImage: {
        video: "url('../images/video/video.png')",
      },
      content: {
        'icon-copy': 'url("../images/icon/icon-copy-alt.svg")',
      },
      transitionProperty: { width: 'width', stroke: 'stroke' },
      borderWidth: {
        6: '6px',
      },
      boxShadow: {
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        card: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        'card-2': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        switcher:
          '0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)',
        'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
        1: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        3: '0px 1px 5px rgba(0, 0, 0, 0.14)',
        4: '0px 4px 10px rgba(0, 0, 0, 0.12)',
        5: '0px 1px 1px rgba(0, 0, 0, 0.15)',
        6: '0px 3px 15px rgba(0, 0, 0, 0.1)',
        7: '-5px 0 0 #313D4A, 5px 0 0 #313D4A',
        8: '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)',
      },
      dropShadow: {
        1: '0px 1px 0px #E2E8F0',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        rotating: {
          '0%, 100%': { transform: 'rotate(360deg)' },
          '50%': { transform: 'rotate(0deg)' },
        },
        popup: {
          "0%": { transform: "translateY(1rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        'ping-once': 'ping 5s cubic-bezier(0, 0, 0.2, 1)',
        rotating: 'rotating 30s linear infinite',
        'spin-1.5': 'spin 1.5s linear infinite',
        'spin-2': 'spin 2s linear infinite',
        'spin-3': 'spin 3s linear infinite',
        "popupin": "popup 1.5s normal"
      },

      gridColumn: {
        'span-0.5': 'span 0.5/span 0.5'
      }
    },
  },
  plugins: [
    // require('@tailwindcss/aspect-ratio'),
  ],
};
