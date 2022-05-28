declare module "google-home-player" {
  export default class GoogleHomePlayer {
    constructor(ip: string, language?: string, slow?: boolean);

    say(text: string, language?: string, slow?: boolean): Promise<void>;
    play(url: string, contentType?: string): Promise<void>;
  }
}
