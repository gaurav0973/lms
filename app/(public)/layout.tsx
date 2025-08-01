import Navbar from "./_component/Navbar"

function LayoutPublic({ children } : { children: React.ReactNode }) {
  return (
    <div>
        <Navbar />
        <main className="container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
    </div>
  )
}
export default LayoutPublic