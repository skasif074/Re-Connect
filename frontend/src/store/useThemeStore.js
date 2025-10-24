import {create} from "zustand"
export const useThemeStore = create((set)=>({
    theme:localStorage.getItem('current')||"night",
    setTheme:(theme)=>{
    localStorage.setItem('current',theme)
    set({theme});
    }
}))