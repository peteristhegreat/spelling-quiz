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
        'system-cursive': ["Brush Script MT", "Brush Script Std", "cursive"],
        'cursive': ["GradeCursive"]
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
