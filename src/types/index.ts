export interface SolutionCategory {
  id: string;
  name: string;
  shortDesc: string; // Max 10 to 15 words
  glassSpec: string;
  imageUrl: string;
}

export interface ProjectFormData {
  fullName: string;
  whatsapp: string;
  cityNeighborhood: string;
  serviceType: string;
  widthCm: string;
  heightCm: string;
  piecesCount: string;
  description: string;
  photos: {
    name: string;
    size: number;
    previewUrl: string;
  }[];
}
