export type Equipment = {
  id: string;
  name: string;
  brand: string;
  reference: string;
  category: 'mobile' | 'split' | 'professional';
  coolingWatts: number;
  indicativeArea?: { squareMeters: number; conditions: string };
  dimensions: string;
  soundLevel: string;
  features: string[];
  photos: { src: string; alt: string }[];
  documents: { label: string; href: string }[];
  price?: { amount: number; unit: string; taxLabel: string };
  rentalConditions: string;
  verified: boolean;
  availability?: { label: string; checkedAt: string; source: string };
};
// Ajouter exclusivement des références et caractéristiques vérifiées.
export const equipment: Equipment[] = [];
