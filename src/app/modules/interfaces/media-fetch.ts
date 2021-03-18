import { IMedia } from './media';

export interface IMediaFetch {
  page: number;
  totalPages: number;
  totalResults: number;
  results: IMedia[];
}
