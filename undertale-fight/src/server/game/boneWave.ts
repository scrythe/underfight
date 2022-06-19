import { BoneState } from '../../shared/stateInterface';
import { LongBone } from './bone';
import { BoneData } from '../../shared/interface';

class BoneWave {
  private bones: LongBone[];
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

  private removeBone(bone: LongBone) {
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
    const bone = new LongBone(boneData);
    this.bones.push(bone);
  }

  restart(bonesData: BoneData[]) {
    this.bones = [];
    this.unusedBonesData = bonesData;
    this.frame = 0;
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
