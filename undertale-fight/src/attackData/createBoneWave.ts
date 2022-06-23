import { writeFile } from 'fs';

const defaultBoneData = {
  start: 0,
  position: {
    x: 570,
    y: 597,
  },
  attacks: [
    {
      speed: {
        x: -8,
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

const boneBoxesAmount = 3;
const bonesPerBox = 8;

const boneWidth = 225;

const bonesAmount = bonesPerBox * boneBoxesAmount;
const attackWidth = boneWidth * boneBoxesAmount;

const boxHeight = 225;

const startX = 570;
const startY = 597;
const endY = startY - 225;

const bones = createBoneWave(bonesAmount, attackWidth);
writeAttackData(bones);

function createBoneWave(bonesAmount: number, width: number) {
  const bones: BoneData[] = [];
  const boneXSteps = width / bonesAmount;
  const boneYSteps = 10;
  let currentX = startX;
  let currentHeight = 100;
  let topBoneShrinkingState = false;

  for (let index = 0; index < bonesAmount; index++) {
    const topBone = getBoneCopy();
    const bottomBone = getBoneCopy();

    [topBone.position.y, bottomBone.position.y] =
      getTopBottomBonePos(currentHeight);
    topBone.position.x = bottomBone.position.x = currentX;
    currentX += boneXSteps;

    topBoneShrinkingState = getTopBoneShrinkingState(
      currentHeight,
      topBoneShrinkingState
    );
    currentHeight = topBoneShrinkingState
      ? currentHeight - boneYSteps
      : currentHeight + boneYSteps;

    bones.push(topBone);
    bones.push(bottomBone);
  }
  return bones;
}

function getTopBoneShrinkingState(boneHeight: number, currentState: boolean) {
  const maxHeight = 150;
  const minHeight = 80;
  if (boneHeight >= maxHeight) return true;
  if (boneHeight <= minHeight) return false;
  else return currentState;
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

function getTopBottomBonePos(height: number) {
  const heightGap = 40;
  const boneHeight = 150;
  const topHeight = height - heightGap / 2;
  const bottomHeight = boxHeight - height - heightGap / 2;
  const topY = startY - topHeight;
  const bottomY = endY - boneHeight + bottomHeight;
  return [topY, bottomY];
}
