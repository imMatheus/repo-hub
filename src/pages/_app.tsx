import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, gql } from '@apollo/client'
import Layout from '@/components/Layout'
import { client } from '@/apollo'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Head>
                    <title>Repo hub</title>
                    <meta
                        name='description'
                        content='See code progression of Github repos'
                    />
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    )
}
