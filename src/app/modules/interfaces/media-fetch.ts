import { Media } from './media';

export interface MediaFetch {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Media[];
}
