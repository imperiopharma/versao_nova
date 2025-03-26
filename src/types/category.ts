
import { ReactNode } from 'react';

export type Category = {
  id: string;
  name: string;
  icon: ReactNode | (() => ReactNode);
  description?: string;
  slug?: string;
  color?: string;
  link?: string;
  title?: string;
  active?: boolean;
};

export type ServiceCard = {
  id: string;
  title: string;
  icon: ReactNode | (() => ReactNode);
  color?: string;
  description?: string;
  link?: string;
};
