import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Inter } from "next/font/google"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "The Best Trader - Bot de Trading com IA",
  description: "Bot de trading automatizado com inteligência artificial para criptomoedas na Binance",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${orbitron.variable} ${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}
