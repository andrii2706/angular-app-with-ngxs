export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      screen: {
        sm: '640px',
        md: '768px',
        'big-table': '824px',
        lg: '1024px',
        xl: '1280px',
        'big-screen': '1500px',
        '2xl': '1700px',
      },
    },
  },
  plugins: ['daisyui'],
};
