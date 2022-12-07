import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: './src/graphql/schema.docs.graphql',
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        './src/__generated__/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            },
        },
    },
    ignoreNoDocuments: true,
}

export default config
