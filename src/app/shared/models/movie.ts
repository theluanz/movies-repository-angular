import { NumberValueAccessor } from '@angular/forms';

export interface Movie {
  id?: number;
  title: string;
  urlPhoto: string;
  releasedDate: Date | string;
  description: string;
  imdbScore: number;
  urlImdb?: string;
  category: string;
}
