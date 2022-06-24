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
  private _bones: Array<NormalBone | LongBone | VeryLongBone>;
  private unusedBonesData: BoneData[];
  private frame: number;

  constructor(bonesData: BoneData[]) {
    this._bones = [];
    this.unusedBonesData = bonesData;
    this.frame = 0;
  }

  bonesGone() {
    const boneLength = this._bones.length;
    return boneLength == 0;
  }

  private removeBoneData(boneData: BoneData) {
    const boneDataIndex = this.unusedBonesData.indexOf(boneData);
    this.unusedBonesData.splice(boneDataIndex, 1);
  }

  private removeBone(bone: NormalBone | LongBone | VeryLongBone) {
    const boneIndex = this._bones.indexOf(bone);
    this._bones.splice(boneIndex, 1);
  }

  private removeFinishedBones() {
    const finishedBones = this._bones.filter((bone) => bone.isBoneFinished());
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
    this._bones.push(bone);
  }

  update() {
    this.addStartedBones();
    this.removeFinishedBones();
    this._bones.forEach((bone) => {
      bone.update();
    });
    this.frame += 1;
  }

  getBoneStates(): BoneState[] {
    const boneStates: BoneState[] = [];
    this._bones.forEach((bone) => {
      const boneState = bone.getBoneState();
      boneStates.push(boneState);
    });
    return boneStates;
  }

  get bones() {
    return this._bones;
  }
}

export default BoneWave;
