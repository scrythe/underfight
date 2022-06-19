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
  const output_path1 = 'src/server/gameShared/schema.json';
  const output_path2 = 'src/attackData/schema.json';
  const schema = createSchema();
  const schemaString = JSON.stringify(schema, null, 2);
  writeFile(output_path1, schemaString, (err) => {
    if (err) throw err;
  });
  writeFile(output_path2, schemaString, (err) => {
    if (err) throw err;
  });
}

writeSchemaFile();
