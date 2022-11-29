import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, gql } from '@apollo/client'
import Layout from '@/components/Layout'
import { client } from '@/apollo'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    )
}
