const { createGenerator } = require('ts-json-schema-generator');
const { writeFile } = require('fs');

function createSchema() {
  /** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
  const config = {
    path: 'src/shared/interface.ts',
    tsconfig: 'src/server/tsconfig.json',
    type: 'Schema',
  };

  const schemaGenerator = createGenerator(config);
  const schema = schemaGenerator.createSchema(config.type);
  return schema;
}

function writeSchemaFile() {
  const output_path = 'src/attackData/schema.json';
  const schema = createSchema();
  const schemaString = JSON.stringify(schema, null, 2);
  writeFile(output_path, schemaString, (err) => {
    if (err) throw err;
  });
}

writeSchemaFile();
