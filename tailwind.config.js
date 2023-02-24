/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.{html,js,jsx}"],
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
  mode: 'jit',
	darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend:
    {
      fontFamily: {
        'comic': ["LDFComicSans"],
        // 'comic': ["Comic Sans MS", "Comic Sans", "Apple Chancery", "cursive"],
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
