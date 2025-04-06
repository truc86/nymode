export type PromotionalSpot = {
  link: string;
  position: number;
  type: string;
  image: Image;
  imageAltText: string;
  _alias: string;
};

export type Image = {
  aspectRatio: string;
  imageUrl: string;
  focalPoint: {
    x: number;
    y: number;
  };
  maxWidth: string;
  alt: string;
};
