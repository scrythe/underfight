import RectObject, { Rect } from '../../shared/rectangle';
import { Speed, Attack, BoneData } from '../../shared/interface';
import { BoneState } from '../../shared/stateInterface';

class Bone {
  private WIDTH = 10;
  private HEIGHT = 50;
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

  constructor({ position, attacks, end }: BoneData) {
    const boneObject = new RectObject(this.WIDTH, this.HEIGHT);
    this._rect = boneObject.getRect({ topLeft: position });
    this.speed = { x: 0, y: 0 };
    this.frame = 0;
    this.attacks = attacks;
    this.currentAttack = this.attacks[0] || this.defaultAttack;
    this.end = end;
    this.updateState();
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

  getBoneState(): BoneState {
    const bonePos = { x: this._rect.x, y: this._rect.y };
    const state = { bonePos };
    return state;
  }
}

export default Bone;
