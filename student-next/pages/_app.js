import '../styles/globals.css';
import { Button, Code, Title, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider theme={{
      fontFamily: 'Inter, sans-serif',
      colors: {
        'fa-primary': ["#2D79AD",  "#14A60E", "#CDE9F8", "#BDBDBD", "#191919", "#DBDBDB", "#EF5252"]],
      },
    }}>
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default MyApp
