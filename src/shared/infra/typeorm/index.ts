import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (host = 'postgres_database'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV ? 'localhost' : host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'hacka_wms_tests'
          : defaultOptions.database,
    }),
  );
};
