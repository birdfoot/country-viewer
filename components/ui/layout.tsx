import Masthead from "./masthead/masthead"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Masthead />
      <main className="container">{children}</main>
    </>
  )
}

export default Layout
