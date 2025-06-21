export interface UnsplashPhoto {
  id: string;
  description: string | null;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    username: string;
  };
  likes: number;
  links: {
    download: string;
  };
  slug: string;
}

export interface UnsplashResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export interface SearchParams {
  query: string;
  page: number;
}

export interface requestParamsType {
  orientation?: "landscape" | "portrait" | "squarish";
  per_page?: number;
  content_filter?: "low" | "high";
  query?: string;
  page?: number;
}

export interface SearchBarProps {
  getRequestPhrase: (searchphrase: string) => void;
}

export interface ImageModalProps {
  onClose: () => void;
  currentImg: UnsplashPhoto | null;
  isOpen: boolean;
}

export interface ImageGalleryProps {
  imagesData: UnsplashPhoto[];
  showModal: (img: UnsplashPhoto) => void;
}
