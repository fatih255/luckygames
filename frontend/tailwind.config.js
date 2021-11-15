module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './layouts/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        slideinright: "sliderinight .7s cubic-bezier(0.25, 0.46, 0.45, 0.94) , bounce 4s .7s ease-in-out infinite",
        bounce: 'bounce 4s ease-in-out infinite',
        reversebounce: 'reversebounce 4s 4.7s ease-in infinite',
        shakelefthand: 'shakelefthand 1s ease-in 3 forwards',
        shakerighthand: 'shakerighthand 1s ease-in 3 forwards',
      },
      keyframes: {

        sliderinight: {
          '0%': {
            opacity: 0,
            transform: 'translateX(1000px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0px)'
          },

        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        reversebounce: {
          '0%, 100%': {
            transform: 'translateY(0px)',

          },
          '50%': {
            transform: 'translateY(20px)',
          },
        },
        shakelefthand: {
          '0%, 100%': {
            transform: 'rotate(0deg)'
          },
          '50%': {
            transform: 'rotate(30deg)'
          }
        },
        shakerighthand: {
          '0%, 100%': {
            transform: 'rotate(0deg)'
          },
          '50%': {
            transform: 'rotate(-30deg)'
          }
        }
      }
    },
  },
  variants: {
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        '8': 'repeat(8, minmax(0, 1fr))',

        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      }
    },
  },
  plugins: [

  ],
}