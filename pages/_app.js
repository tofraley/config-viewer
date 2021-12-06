import '../styles/json-inspector.css'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="container ml-8 my-3">
      <Component {...pageProps} />
    </div>
  )}

export default MyApp
