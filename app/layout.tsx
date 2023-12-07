import { ReactNode } from "react"
import { exo2, orbitron } from "./fonts"
import Navbar from "../components/Navbar"
import "./global.css"

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
      <body className=" flex flex-col min-h-screen bg-orange-50">
        <header className="sticky top-0 z-10 p-4 bg-orange-100/80">
          <Navbar />
        </header>
        <main className="py-3 grow  px-4 ">{children}</main>
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
