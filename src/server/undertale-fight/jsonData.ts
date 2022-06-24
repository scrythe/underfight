import Ajv, { ValidateFunction } from 'ajv';
import schema from '../../attackData/schema.json';
import {
  AttackMap,
  AttackType,
  Schema,
} from '../../shared/undertale-fight/interface';
import { readFileSync } from 'fs';
import { join } from 'path';

import '../../attackData/boneJumpWave.json';
import '../../attackData/boneStab.json';
import '../../attackData/boneWave.json';

const attackDataFolderPath = join(__dirname, '../../', 'attackData');

const attackMap: AttackMap = {
  BoneStab: join(attackDataFolderPath, 'boneStab.json'),
  BoneWave: join(attackDataFolderPath, 'boneWave.json'),
  BoneJumpWave: join(attackDataFolderPath, 'boneJumpWave.json'),
};

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
        boneType: 'LongBone',
      },
    ],
  };

  constructor(attack: AttackType) {
    this.ajv = new Ajv();
    this.validate = this.ajv.compile(this.schema);
    this.data = this.loadFile(attack);
  }

  private loadFile(attack: AttackType) {
    const attackDataFilePath = attackMap[attack];
    const jsonString = readFileSync(attackDataFilePath, 'utf8');
    const data = JSON.parse(jsonString);
    const valid = this.validate(data);
    const attackData = valid ? data : this.defaultAttackData;
    return attackData;
  }

  get bonesData() {
    const boneDataString = JSON.stringify(this.data.bonesData);
    return JSON.parse(boneDataString);
  }
}

export default JsonData;
