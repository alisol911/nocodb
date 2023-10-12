import { type BoolType, SSLUsage } from 'nocodb-sdk'
import { ClientType } from '~/lib/enums'

// todo: move to noco-sdk
export enum NcProjectType {
  DB = 'database',
}

interface ProjectCreateForm {
  title: string
  dataSource: {
    client: ClientType
    connection: DefaultConnection
    searchPath?: string[]
  }
  inflection: {
    inflectionColumn?: string
    inflectionTable?: string
  }
  sslUse?: SSLUsage
  extraParameters: { key: string; value: string }[]
  is_private?: BoolType
  is_schema_readonly?: BoolType
  is_data_readonly?: BoolType
  fk_integration_id?: string
}

interface DefaultConnection {
  host: string
  database: string
  user: string
  password: string
  port: number | string
  ssl?: Record<CertTypes, string> | 'no-verify' | 'true'
}

const defaultHost = 'localhost'

export { getTestDatabaseName } from 'nocodb-sdk'

export const clientTypes = [
  {
    text: 'PostgreSQL',
    value: ClientType.PG,
  }
]

export const clientTypesMap = clientTypes.reduce((acc, curr) => {
  acc[curr.value] = curr
  return acc
}, {} as Record<string, (typeof clientTypes)[0]>)

const homeDir = ''

const sampleConnectionData: { [ClientType.PG]: DefaultConnection } = {
  [ClientType.PG]: {
    host: defaultHost,
    port: '5432',
    user: 'postgres',
    password: 'password',
    database: '_test',
  },

}

export const getDefaultConnectionConfig = (client: ClientType): ProjectCreateForm['dataSource'] => {
  return {
    client,
    connection: sampleConnectionData[client],
    searchPath: ['public'],
  }
}

enum CertTypes {
  ca = 'ca',
  cert = 'cert',
  key = 'key',
}

const errorHandlers = [
  {
    messages: ['unable to get local issuer certificate', 'self signed certificate in certificate chain'],
    codes: ['UNABLE_TO_GET_ISSUER_CERT_LOCALLY', 'SELF_SIGNED_CERT_IN_CHAIN'],
    action: {
      connection: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },
  },
  {
    messages: ['SSL is required'],
    codes: ['28000'], // PostgreSQL error code for invalid authorization specification
    action: {
      connection: {
        ssl: true,
      },
    },
  },
  {
    messages: ['the server does not support SSL connections'],
    codes: ['08P01'], // PostgreSQL error code for protocol violation
    action: {
      connection: {
        ssl: false,
      },
    },
  },
]

function generateConfigFix(e: any) {
  for (const handler of errorHandlers) {
    const errorMessage = e?.response?.data?.msg
    const errorCode = e?.response?.data?.sql_code

    if (!errorMessage && !errorCode) return

    const messageMatches = errorMessage && handler.messages.some((msg) => errorMessage?.includes?.(msg))
    const codeMatches = errorCode && handler.codes.includes(errorCode)

    if (messageMatches || codeMatches) {
      return handler.action
    }
  }
}

export {
  generateConfigFix,
  SSLUsage,
  CertTypes,
  ProjectCreateForm,
  DefaultConnection,
}
