export default function Layout({ children }) {
  return (
    <div className="container ml-8 my-3">
      <main>{children}</main>
    </div>
  )
}