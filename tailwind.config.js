export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ink: '#0A0A0A', coal: '#171717', accent: '#D90F1A', muted: '#A3A3A3' }, // brand red from the logo; swap to #FF5A1F for orange
    fontFamily: { display: ['"Bebas Neue"', 'Impact', 'sans-serif'], body: ['Inter', 'sans-serif'] },
  } },
  plugins: [],
}
