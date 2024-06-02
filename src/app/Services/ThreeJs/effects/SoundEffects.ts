
export enum SoundList {
    Bomb = "../../../../assets/sound/8bit_bomb_explosion.wav",
    Shoot = "../../../../assets/sound/NenadSimic - Muffled Distant Explosion.wav",
}

export class SoundEffect {
    private _audioInstance: HTMLAudioElement = new Audio();
    private static _instance: SoundEffect = new SoundEffect();

    /**
    * Get the SoundEffect instance
    * @returns return an instance of SoundEffect
    */
    public static get instance(): SoundEffect {
        return this._instance;
    }

    /**
    * Play sound
    * @param sound relative path of the sound file
    */
    public async playSound(sound: SoundList): Promise<void> {
        this._audioInstance.src = sound;
        this._audioInstance.load();
        this._audioInstance.play();
    }
}