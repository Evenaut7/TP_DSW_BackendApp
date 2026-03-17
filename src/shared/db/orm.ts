import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const isProd = process.env.NODE_ENV === 'production';

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: process.env.DB_NAME || 'traveldb',
  type: 'mysql',
  clientUrl: process.env.DATABASE_URL || 'mysql://dsw:dsw@localhost:3306/traveldb',
  highlighter: isProd ? undefined : new SqlHighlighter(),
  debug: !isProd,
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  // await generator.dropSchema();
  // await generator.createSchema();
  await generator.updateSchema();
};
