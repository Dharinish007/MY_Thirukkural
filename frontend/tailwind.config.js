/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🌿 Base UI
        bgLight: '#F9FAFB',  // smoother white with warmth
        bgDark: '#0F172A',   // dark mode foundation
        surface: '#FFFFFF',  // cards, modals
        textDark: '#111827', // rich neutral text
        textLight: '#6B7280', // subtle gray text
        border: '#E5E7EB',  // soft neutral border
        fbBlue: '#1877F2',

        // 💚 Arathupal — Vibrant Emerald Harmony
        arathu: {
          primary: '#00C853',  // vivid emerald (vibrant but grounded)
          light: '#5EFCC1',    // glowing mint aura
          dark: '#007E33',     // deep forest green
          accent: '#B9F6CA'    // gentle soft mint tint
        },

        // 💛 Porutpal — Golden Harmony
        porut: {
          primary: '#F6C90E',  // warm luxury golden yellow
          light: '#FFE47A',    // radiant gold accent
          dark: '#E0A106',     // rich amber hue
          accent: '#FFF8E1'    // pale cream glow
        },

        // 💗 Kamathupal — Romantic Vibrance
        kamathu: {
          primary: '#E4405F',  // vivid coral-pink (energetic & emotional)
          light: '#FF7D9D',    // soft romantic rose
          dark: '#B71C3B',     // deep cherry-magenta
          accent: '#FCE4EC'    // pastel blush background
        },

        // 🌊 Harmony Highlights
        harmony: {
          teal: '#00C9A7',     // main theme tone
          violet: '#6C63FF',   // creative accent
          pink: '#FF6584',     // emotional pop
        },

        // ✅ Feedback Colors
        success: '#00E676',    // bright success green
        danger: '#FF1744',     // confident red
        info: '#1E88E5',       // calm blue info
        warning: '#FFB300',    // golden amber
      },

      textCard: {
        light: 'text-textDark/80',
        dark: 'text-white/90',
      },


      fontFamily: {
        tamil: ['Noto Sans Tamil', 'sans-serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      
      boxShadow: {
        soft: '0 4px 12px rgba(0, 0, 0, 0.08)',
        card: '0 6px 20px rgba(0, 0, 0, 0.12)',
        glow: '0 0 20px rgba(0, 201, 167, 0.25)', // elegant glow for focus elements
      },

      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },

      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
