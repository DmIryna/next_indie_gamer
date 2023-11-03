import { ReactNode } from "react"
import "./global.css"
import Navbar from "../components/Navbar"
import { exo2, orbitron } from "./fonts"

interface RootLayoutProps {
  children: ReactNode
}

export const metadata = {
  title: {
    default: "Indie Gamer",
    template: "%s | Indie Gamer",
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className="px-4 py-2 flex flex-col min-h-screen bg-orange-50">
        <header>
          <Navbar />
        </header>
        <main className="py-3 grow">{children}</main>
        <footer className="text-center text-xs border-t py-3 text-slate-500">
          Game data and images courtesy of{" "}
          <a
            href="https://rawg.io"
            target="_blank"
            className="text-orange-600 cursor-pointer hover:underline hover:text-gray-500"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  )
}
