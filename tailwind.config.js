/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.{html,js,jsx}"],
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend:
    {
      fontFamily: {
        'comic': ["Comic Sans MS", "Comic Sans", "Choco cooky", "Apple Chancery", "cursive"],
        'cursive': ["Brush Script MT", "Brush Script Std", "cursive"]
      },
    },
  },
	variants: {
		extend: {}
	},
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
