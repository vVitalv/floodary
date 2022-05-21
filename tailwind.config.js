module.exports = {
  content: ['./client/**/*.html', './client/**/*.jsx', './client/**/*.js'],
  theme: {},
  variants: {
    scrollbar: ['rounded']
  },
  plugins: [require('tailwind-scrollbar')]
}
