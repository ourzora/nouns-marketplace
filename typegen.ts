import { CodegenConfig } from '@graphql-codegen/cli'

if (!process.env.NEXT_PUBLIC_GALACTUS_BASE_URL) {
  throw new Error('NEXT_PUBLIC_GALACTUS_BASE_URL is not defined')
}

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_GALACTUS_BASE_URL}`,
  documents: ['./data/*.ts'],
  generates: {
    './types/zora.api.generated.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        skipTypename: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
