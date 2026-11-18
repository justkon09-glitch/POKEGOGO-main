const STORAGE_KEY = 'pokemon_sprites';

export const SpriteService = {

  // get all sprit
  getAll: (): Record<string, string> => {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '{}'
    );
  },

  // get sprite
  get: (pokemonId: number): string | null => {
    const sprites = SpriteService.getAll();
    return sprites[pokemonId] || null;
  },

  // saves it locally
  save: (pokemonId: number, image: string): void => {
    const sprites = SpriteService.getAll();

    sprites[pokemonId] = image;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sprites)
    );
  },

  // remog sprite
  delete: (pokemonId: number): void => {
    const sprites = SpriteService.getAll();

    delete sprites[pokemonId];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sprites)
    );
  }
};