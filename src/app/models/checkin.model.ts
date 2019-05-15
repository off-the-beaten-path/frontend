import { ILatLngPosition } from './position.model';
import { IGeoCache } from './geocache.model';
import { IImage } from './image.model';

export interface ICheckIn {
  id: number;

  geocache: IGeoCache;
  image: IImage;

  location: ILatLngPosition;
  text: string;
  created_at: number;
}
