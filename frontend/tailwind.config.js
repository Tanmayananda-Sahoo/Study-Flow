/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper:  '#F7F6F3',
        accent: {
          DEFAULT: '#3A6EA5',
          light:   '#E8EEF5',
          mid:     '#C5D8EE',
        },
        ink: {
          DEFAULT: '#1D1D1F',
          muted:   '#6E6E73',
        },
        border: {
          DEFAULT: '#E5E5E5',
          soft:    '#EFEFED',
        },
      },
      fontFamily: {
        sans: ["'DM Sans'", "'SF Pro Display'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4' }],
        'xs':  ['11px', { lineHeight: '1.5' }],
        'sm':  ['12px', { lineHeight: '1.5' }],
        'base':['13px', { lineHeight: '1.6' }],
        'md':  ['14px', { lineHeight: '1.6' }],
        'lg':  ['16px', { lineHeight: '1.5' }],
        'xl':  ['18px', { lineHeight: '1.4' }],
        '2xl': ['22px', { lineHeight: '1.3' }],
        '3xl': ['26px', { lineHeight: '1.2' }],
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
        '2xl':'14px',
        '3xl':'16px',
        '4xl':'18px',
      },
      boxShadow: {
        'card':       '0 1px 4px rgba(0,0,0,0.03)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.07)',
        'login':      '0 4px 32px rgba(0,0,0,0.06)',
      },
      height: {
        'navbar': '56px',
      },
      width: {
        'sidebar': '220px',
      },
      minHeight: {
        'content': 'calc(100vh - 56px)',
      },
      letterSpacing: {
        'tighter': '-0.5px',
        'tight':   '-0.3px',
        'label':   '0.04em',
        'caps':    '0.08em',
      },
      transitionDuration: {
        '150': '150ms',
      },
    },
  },
  plugins: [],
}
