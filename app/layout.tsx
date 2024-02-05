import { Inter } from "next/font/google"
import "./globals.css"
import { NextThemesProvider } from "@/components/providers/NextThemesProvider"
import { CodeIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}, container mx-auto flex min-h-screen flex-col px-[1rem] antialiased selection:bg-black selection:text-white dark:bg-black dark:selection:bg-white dark:selection:text-black md:px-[2rem]`}
      >
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="flex-grow">{children}</main>
          <footer>
            <div
              className="group flex items-center justify-center gap-1 text-neutral-400 dark:text-neutral-600"
              aria-hidden={true}
            >
              <div className="group flex items-center relative cursor-pointer after:absolute after:bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-green-800 after:transition-all after:duration-300 hover:after:w-full">
              <CodeIcon className="h-5 w-5 text-green-900" />
              <Button variant="linkNoUnderline" asChild>
                <Link href="https://github.com/juliancasaburi" target="_blank">
                  Desarrollado por @juliancasaburi
                </Link>
              </Button>
              </div>
            </div>
            <div className="text-center text-sm text-neutral-400 dark:text-neutral-600">
              La información se obtiene de las APIs
              <a
                href="https://argentinadatos.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1.5 text-primary text-primary relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-800 after:transition-all after:duration-300 hover:after:w-full"
              >
                ArgentinaDatos
              </a>
              y
              <a
                href="https://dolarapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1.5 text-primary text-primary relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-800 after:transition-all after:duration-300 hover:after:w-full"
              >
                DolarApi.
              </a>
            </div>
          </footer>
        </NextThemesProvider>
      </body>
    </html>
  )
}
