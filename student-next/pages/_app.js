import '../styles/globals.css'
import { Button, Code, Title, MantineProvider } from '@mantine/core';
function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider theme={{
      fontFamily: 'Inter, sans-serif',
      colors: {
        'findadmission': ["#2D79AD", "#14A60E", "#CDE9F8", "#BDBDBD", "#191919", "#DBDBDB", "#EF5252"]
      },
    }}>
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
