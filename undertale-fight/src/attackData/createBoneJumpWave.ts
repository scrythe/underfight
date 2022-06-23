import { writeFile } from 'fs';

const defaultBoneData = {
  start: 0,
  position: {
    x: 575,
    y: 597,
  },
  attacks: [
    {
      speed: {
        x: 0,
        y: 0,
      },
      end: 3600,
    },
  ],
  end: 3600,
  boneType: 'VeryLongBone',
};

function getBoneCopy() {
  return structuredClone(defaultBoneData);
}

type BoneData = typeof defaultBoneData;

const boneWidth = 10;
const boneHeight = 150;
const boxWidth = 225;
const boxHeight = boxWidth;

const startX = 592;
const endX = startX - boxWidth - boneWidth;

const boxPos = 597;

const bottomY = boxPos - 40;
const topY = boxPos - boxHeight;

const bonesAmount = 6;

const bones = createBoneJumpWave(bonesAmount);
writeAttackData(bones);

function createBoneJumpWave(bonesAmount: number) {
  const bones: BoneData[] = [];
  let leftX = endX;
  let rightX = startX;
  const boneXSteps = 200;
  const speed = 4;

  for (let index = 0; index < bonesAmount; index++) {
    const leftBones = createTopAndBottomBone(leftX, speed);
    const rightBones = createTopAndBottomBone(rightX, -speed);

    leftX -= boneXSteps;
    rightX += boneXSteps;

    bones.push(...leftBones);
    bones.push(...rightBones);
  }
  return bones;
}

function createTopAndBottomBone(x: number, speed: number) {
  const topBone = getBoneCopy();
  const bottomBone = getBoneCopy();

  topBone.position.x = bottomBone.position.x = x;
  topBone.attacks[0].speed.x = bottomBone.attacks[0].speed.x = speed;

  topBone.position.y = topY;
  bottomBone.position.y = bottomY;

  return [topBone, bottomBone];
}

function writeAttackData(boneData: BoneData[]) {
  const data = {
    $schema: './schema.json',
    bonesData: boneData,
  };
  const outputPath = 'src/attackData/attackData.json';
  const dataString = JSON.stringify(data, null, 2);
  writeFile(outputPath, dataString, (err) => {
    if (err) throw err;
  });
}
