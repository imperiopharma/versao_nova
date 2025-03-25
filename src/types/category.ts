
import { ReactNode } from 'react';

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: ReactNode | (() => ReactNode);
  link: string;
  color: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: ReactNode | (() => ReactNode);
  link: string;
  color: string;
}
