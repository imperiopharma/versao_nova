
import { ReactNode } from 'react';

export type Category = {
  id: string;
  name: string;
  icon: ReactNode | (() => ReactNode);
  description?: string;
  slug?: string;
};
