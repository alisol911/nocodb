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

const testDataBaseNames = {
  [ClientType.PG]: 'postgres',
}

export const getTestDatabaseName = (db: { client: ClientType; connection?: { database?: string } }) => {
  return db.connection?.database
}

export const clientTypes = [
  {
    text: 'PostgreSQL',
    value: ClientType.PG,
  }
]

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

enum SSLUsage {
  No = 'No',
  Allowed = 'Allowed',
  Preferred = 'Preferred',
  Required = 'Required',
  RequiredWithCa = 'Required-CA',
  RequiredWithIdentity = 'Required-Identity',
}

enum CertTypes {
  ca = 'ca',
  cert = 'cert',
  key = 'key',
}

export { SSLUsage, CertTypes, ProjectCreateForm, DefaultConnection }
