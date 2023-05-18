/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        green: { 9: "#BFFDE3", 10: "#71FDA9", 11: "#80DC69", 44: "#43BB0B", 133: "#80C959",  12: "#76BC86", 13: "#78C6B0", 14: "#84C6A1", 15: "#208D8E" , 16: "#118C80" },
        gray: { 7: "#F0F1F3", 8: "#D3D3D3", 9: "#BDC0C6", 10: "#AAAAAA", 11: "#5F6C7C", 12: "#486774", 13: "#46494D", 14: "#323232", 17: "#8A8989", 15: "#818181" },
        red: { 9: "#EBC8C8", 10: "#EC8182", 11: "#E17E80", 111: "#F27474", 12: "#E46161", 133: "#E45454", 144: "#F84747", 14: "#FC0733", 44: "#FB0606", 66: "#9F0000", 55: "#F92E8F", 56: "#F98F2E", 15: "#E57A57", 16: "#F3C567", 17: "#E28A60", 18: "#F1A25C", 19: "#B9995E" },
        blue: { 9: "#E9F9FF", 99: "#C5FFFF", 10: "#74AADD", 11: "#7FA1D1", 55: "#7FFAFA", 56: "#A5E4F8", 66: "#4AB7D8", 67: "#09DBCE", 12: "#6CB2F7", 13: "#6897C2", 14: "#6DAFCE", 15: "#3C45E7", 16: "#2E7FF9" },
        purple: { 10: "#EEDFF6", 11: "#C3B7F2", 12: "##9286EA", 13: "#C074D1", 14: "#DE88FD" },
        yellow: { 10: "#EAF562", 111: "#FFE605", 11: "#DEC908", 12: "#F98F2E", 13: "#FFAE34" }
      },
    },


    plugins: [],
  }
}