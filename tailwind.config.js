/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary':'var(--primary)',
        'secondary': 'var(--secondary)',
        'contrast':'var(--contrast)',
        'text_color':'var(--text)',
        'shadow_color':'var(--shadow)',
        'icon_color': 'var(--icon)',
        'hover_color':'var(--hover)',
        'hover_color_2':'var(--hover_2)',
        'bg_color':'var(--bg)'
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

