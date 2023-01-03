/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    screens: {
      'fold': { 'max': '300px' },
      'mobile': '320px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    colors: {
      brand: {
        primary: 'var(--color-green-500)',
        secondary: 'var(--color-gray-400)',
      },
      hover: {
        primary: 'var(--color-emerald-700)',
        secondary: 'var(--color-gray-500)',
        danger: 'var(--color-red-600)',
      },
      disabled: {
        primary: 'var(--color-emerald-50)',
        secondary: 'var(--color-gray-300)',
        danger: 'var(--color-red-200)',
      },
      color: {
        dark: 'var(--color-gray-800)',
        medium: 'var(--color-gray-500)',
        light: 'var(--color-white)',
        disabled: 'var(--color-gray-400)',
      },
      support: {
        warning: 'var(--color-amber-500)',
        danger: 'var(--color-red-500)',
        success: 'var(--color-green-500)',
        info: 'var(--color-blue-500)',
      },
      bg: {
        '01' : 'var(--color-gray-100)',
        '02' : 'var(--color-white)',
        '03' : 'var(--color-emerald-50)',
        border: 'var(--color-gray-300)',
      },
      transparent: 'transparent',
      current: 'current',
      inherit: 'inherit'
    },
    extend: {
      spacing: {
        'size-button-01': 'var(--size-l)',
        'size-button-02': 'var(--size-m)',
        'size-input': 'var(--size-l)',
      },
      fontWeight: {
        'xl': 'var(--font-weight-xl)',
        'l': 'var(--font-weight-l)',
        'm': 'var(--font-weight-m)',
        'base': 'var(--font-weight-base)'
      },
      fontSize: {
        'icons': '20px' ,
        // size heading
        'heading-01': ['var(--font-size-5xl)',
                      { fontWeight: 'var(--font-weight-xl)',
                        lineHeight: 'var(--font-height-base)',
                        fontStyle: 'var(--font-style-normal)'
                      }
                      ],
        'heading-02': ['var(--font-size-4xl)',
          { fontWeight: 'var(--font-weight-xl)',
            lineHeight: 'var(--font-height-base)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'heading-03': ['var(--font-size-3xl)',
          { fontWeight: 'var(--font-weight-xl)',
            lineHeight: 'var(--font-height-base)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'heading-04': ['var(--font-size-2xl)',
          { fontWeight: 'var(--font-weight-xl)',
            lineHeight: 'var(--font-height-base)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'heading-05': ['var(--font-size-2xl)',
          { fontWeight: 'var(--font-weight-l)',
            lineHeight: 'var(--font-height-base)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'body-01': ['var(--font-size-base)',
          { fontWeight: 'var(--font-weight-base)',
            lineHeight: 'var(--font-height-base)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'body-02': ['var(--font-size-m)',
          { fontWeight: 'var(--font-weight-base)',
            lineHeight: 'var(--font-height-base)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'button': ['var(--font-size-base)',
          { fontWeight: 'var(--font-weight-m)',
            lineHeight: 'var(--font-height-base)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'label': ['var(--font-size-base)',
          { fontWeight: 'var(--font-weight-base)',
            lineHeight: 'var(--font-height-custom)',
            fontStyle: 'var(--font-style-normal)'
          }
        ],
        'link': ['var(--font-size-base)',
          { fontWeight: 'var(--font-weight-base)',
            lineHeight: 'var(--font-height-custom)',
            fontStyle: 'var(--font-style-underline)'
          }
        ],
      },
      fontFamily: {
        inter: ['inter', 'sans-serif'],
      },
      boxShadow: {
        'shadow-1' : '0px 1px 4px rgba(0, 0, 0, 0.2)',
        'shadow-2' : '0px 2px 10px rgba(0, 0, 0, 0.2)',
        'input' : '0 0 0 1px var(--color-emerald-500) ',
      },
      borderRadius: {
        'pill' :  'var(--radius-pill)',
        'circle' :  'var(--radius-circle)',
        'm' :  'var(--radius-rounded-m)',
        's' :  'var(--radius-rounded-s)',
        'sharp' :  'var(--radius-sharp)',
      },
      letterSpacing: {},
      height: {
        '100v': '100vh'
      },
      width: {
        '100v': '100vw',
        '116': '30rem'
      }
    }
  },
  plugins: []
}
