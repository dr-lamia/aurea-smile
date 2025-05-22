import React, { ChangeEvent } from 'react';

type Props = {
  onImageLoaded: (url: string) => void;
};

const FaceUploader: React.FC<Props> = ({ onImageLoaded }) => {
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      onImageLoaded(url);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="file:bg-gold file:text-ivory file:px-4 file:py-2 file:rounded-md"
      />
    </div>
  );
};

export default FaceUploader;