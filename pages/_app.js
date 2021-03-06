import '../styles/app.scss'
import { AppProvider } from 'context/AppContext'

function MyApp({ Component, pageProps, router }) {
  return (

    <AppProvider>
        <Component 
          {...pageProps} 
          key={router.asPath}
        />
    </AppProvider>

    )
}

export default MyApp