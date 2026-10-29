class SoundService {
  public isMuted(): boolean {
    return true;
  }
  public setMuted(_muted: boolean): void {}
  public toggleMute(): boolean {
    return true;
  }
  public playCallSignal(): void {}
  public playPutSignal(): void {}
  public playClick(): void {}
  public playScanBeep(): void {}
  public playWin(): void {}
}

export const sound = new SoundService();
