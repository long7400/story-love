declare module 'aos';
declare module 'howler' {
  export class Howl {
    constructor(options: any);
    play(): number;
    pause(): this;
    stop(): this;
    volume(volume?: number): number | this;
    mute(muted?: boolean): boolean | this;
  }
  
  export class Howler {
    static volume(volume?: number): number | this;
    static mute(muted?: boolean): boolean | this;
  }
}