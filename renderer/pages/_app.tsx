import './global.css';
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import { createTheme, MantineProvider, Input as MantineInput } from '@mantine/core';
import styles from './app.module.css';

const theme = createTheme({
  components: {
    InputWrapper: MantineInput.Wrapper.extend({
      classNames: {
        label: styles.label,
      },
    }),
  },
});

const GlobalApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default GlobalApp;