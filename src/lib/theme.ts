import {writable} from "svelte/store"
import {browser} from "$app/environment"

const themeLS = localStorage.getItem("theme")
const isDarkInit = browser ? themeLS ? themeLS === 'dark' : window.matchMedia("(prefers-color-scheme: dark)").matches : true
export const isDark = writable(isDarkInit)

export function toggleDark(dark?: boolean) {
  isDark.update(currentIsDark => {
    const isDark = typeof dark === "undefined" ? !currentIsDark : dark

    if (isDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")

    localStorage.setItem("theme", isDark ? 'dark' : 'light')
    
    return isDark
  })
}
