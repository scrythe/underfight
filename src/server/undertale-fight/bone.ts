import RectObject, { Rect } from '../../shared/rectangle';
import {
  Speed,
  Attack,
  BoneData,
  BoneType,
} from '../../shared/undertale-fight/interface';
import { BoneState } from '../../shared/undertale-fight/stateInterface';
import {
  AbstractBoneConst,
  LongBoneConst,
  NormalBoneConst,
  VeryLongBoneConst,
} from '../../shared/undertale-fight/gameConstants';

class AbstractBone {
  private _rect: Rect;
  private speed: Speed;
  private frame: number;
  private attacks: Attack[];
  private currentAttack: Attack;
  private defaultAttack: Attack = {
    speed: {
      x: 0,
      y: 0,
    },
    end: 0,
  };
  private end: number;
  private _boneType: BoneType;

  constructor(
    { position, attacks, end }: BoneData,
    height: number,
    boneType: BoneType
  ) {
    const boneObject = new RectObject(AbstractBoneConst.width, height);
    this._rect = boneObject.getRect({ topLeft: position });
    this.speed = { x: 0, y: 0 };
    this.frame = 0;
    this.attacks = attacks;
    this.currentAttack = this.attacks[0] || this.defaultAttack;
    this.end = end;
    this.updateState();
    this._boneType = boneType;
  }

  private updateAttackSequence() {
    if (this.frame <= this.currentAttack.end) return;
    const currentAttackIndex = this.attacks.indexOf(this.currentAttack);
    const newAttackIndex = currentAttackIndex + 1;
    if (this.isAttackSequenceFinished(newAttackIndex))
      this.finishAttackSequence();
    this.currentAttack = this.attacks[newAttackIndex] || this.defaultAttack;
    this.updateState();
  }

  private isAttackSequenceFinished(newAttackIndex: number) {
    return newAttackIndex >= this.attacks.length;
  }

  private finishAttackSequence() {
    this.updateAttackSequence = () => {};
  }

  private updateState() {
    this.speed.x = this.currentAttack.speed.x;
    this.speed.y = this.currentAttack.speed.y;
  }

  update() {
    this.updateAttackSequence();
    this._rect.x += this.speed.x;
    this._rect.y += this.speed.y;
    this.frame += 1;
  }

  isBoneFinished() {
    return this.frame >= this.end;
  }

  get boneType() {
    return this._boneType;
  }

  getBoneState(): BoneState {
    const bonePos = { x: this._rect.x, y: this._rect.y };
    const boneType = this.boneType;
    const state = { bonePos, boneType };
    return state;
  }

  get rect() {
    return this._rect;
  }
}

export class NormalBone extends AbstractBone {
  constructor(bonesData: BoneData) {
    const height = NormalBoneConst.height;
    super(bonesData, height, 'NormalBone');
  }
}

export class LongBone extends AbstractBone {
  constructor(bonesData: BoneData) {
    const height = LongBoneConst.height;
    super(bonesData, height, 'LongBone');
  }
}

export class VeryLongBone extends AbstractBone {
  constructor(bonesData: BoneData) {
    const height = VeryLongBoneConst.height;
    super(bonesData, height, 'VeryLongBone');
  }
}
