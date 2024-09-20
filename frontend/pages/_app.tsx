import Layout from "@/components/Layout/Layout";
import { theme } from "@/theme";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { description, displayName, version } from "../../package.json";
const pageTitle = `${displayName} - v${version}`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <meta name="description" content={description} />
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://mantine.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mantine.dev/favicon.png" />
      </Head>
      <Notifications position="top-right" />
      <ModalsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalsProvider>
    </MantineProvider>
  );
}
