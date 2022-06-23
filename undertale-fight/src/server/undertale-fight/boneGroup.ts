import { BoneState } from '../../shared/undertale-fight/stateInterface';
import { NormalBone, LongBone, VeryLongBone } from './bone';
import { BoneData, BoneMap } from '../../shared/undertale-fight/interface';

const boneMap: BoneMap<
  typeof NormalBone,
  typeof LongBone,
  typeof VeryLongBone
> = {
  NormalBone,
  LongBone,
  VeryLongBone,
};

class BoneWave {
  private bones: Array<NormalBone | LongBone | VeryLongBone>;
  private unusedBonesData: BoneData[];
  private frame: number;

  constructor(bonesData: BoneData[]) {
    this.bones = [];
    this.unusedBonesData = bonesData;
    this.frame = 0;
  }

  private removeBoneData(boneData: BoneData) {
    const boneDataIndex = this.unusedBonesData.indexOf(boneData);
    this.unusedBonesData.splice(boneDataIndex, 1);
  }

  private removeBone(bone: NormalBone | LongBone | VeryLongBone) {
    const boneIndex = this.bones.indexOf(bone);
    this.bones.splice(boneIndex, 1);
  }

  private removeFinishedBones() {
    const finishedBones = this.bones.filter((bone) => bone.isBoneFinished());
    finishedBones.forEach((bone) => this.removeBone(bone));
  }

  private addStartedBones() {
    const startedBones = this.unusedBonesData.filter((boneData) => {
      const boneStarted = this.frame >= boneData.start;
      return boneStarted;
    });
    startedBones.forEach((boneData) => {
      this.addBone(boneData);
      this.removeBoneData(boneData);
    });
  }

  private addBone(boneData: BoneData) {
    const boneClass = boneMap[boneData.boneType];
    const bone = new boneClass(boneData);
    this.bones.push(bone);
  }

  update() {
    this.addStartedBones();
    this.removeFinishedBones();
    this.bones.forEach((bone) => {
      bone.update();
    });
    this.frame += 1;
  }

  getBoneStates(): BoneState[] {
    const boneStates: BoneState[] = [];
    this.bones.forEach((bone) => {
      const boneState = bone.getBoneState();
      boneStates.push(boneState);
    });
    return boneStates;
  }
}

export default BoneWave;
