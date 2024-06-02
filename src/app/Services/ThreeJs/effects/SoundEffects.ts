
export enum SoundList {
    Bomb = "../../../../assets/sound/8bit_bomb_explosion.wav",
    Shoot = "../../../../assets/sound/NenadSimic - Muffled Distant Explosion.wav",
}

export class SoundEffect {
    private _audioInstance: HTMLAudioElement = new Audio();
    private static _instance: SoundEffect = new SoundEffect();
    public static get instance(): SoundEffect {
        return this._instance;
    }

    public async playSound(sound: SoundList): Promise<void> {
        this._audioInstance.src = sound;
        this._audioInstance.load();
        this._audioInstance.play();
    }
}