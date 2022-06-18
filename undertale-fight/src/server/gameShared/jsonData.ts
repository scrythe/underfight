import Ajv, { ValidateFunction } from 'ajv';
import schema from './schema.json';
import { BoneData, Schema } from '../../shared/interface';
import { writeFile, readFileSync } from 'fs';
import { join } from 'path';

const attackDataFilePath = join(
  __dirname,
  '../../',
  'attackData',
  'attackData.json'
);

class JsonData {
  private ajv: Ajv;
  private schema = schema;
  private validate: ValidateFunction<Schema>;
  private data: Schema;
  private defaultAttackData: Schema = {
    $schema: './schema.json',
    bonesData: [
      {
        position: { x: 475, y: 460 },
        start: 0,
        attacks: [
          {
            speed: {
              x: 0,
              y: -2,
            },
            end: 50,
          },
        ],
        end: 50,
      },
    ],
  };

  constructor() {
    this.ajv = new Ajv();
    this.validate = this.ajv.compile(this.schema);
    this.data = this.loadFile();
  }

  private loadFile() {
    const jsonString = readFileSync(attackDataFilePath, 'utf8');
    const data = JSON.parse(jsonString);
    const valid = this.validate(data);
    const attackData = valid ? data : this.defaultAttackData;
    return attackData;
  }

  reloadFile() {
    this.data = this.loadFile();
  }

  addNewBone(bone: BoneData) {
    const data = JSON.parse(JSON.stringify(this.data));
    data.bonesData.push(bone);
    const dataString = JSON.stringify(this.data, null, 2);
    writeFile(attackDataFilePath, dataString, (err) => {
      if (err) throw err;
    });
  }

  get bonesData() {
    return structuredClone(this.data.bonesData);
  }
}

export default JsonData;
