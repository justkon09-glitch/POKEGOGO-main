import React from 'react';
import { SpriteService } from '../services/spriteService';

interface SpriteUploadProps {
  pokemonId: number;
  onUpload?: () => void;
}

export const SpriteUpload: React.FC<SpriteUploadProps> = ({
  pokemonId,
  onUpload
}) => {

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result as string;

      SpriteService.save(pokemonId, image);

      onUpload?.();
    };

    reader.readAsDataURL(file);
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
    />
  );
};