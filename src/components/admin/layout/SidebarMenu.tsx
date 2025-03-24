
import React from 'react';
import { MenuItem } from './MenuItem';
import { LogoutButton } from './LogoutButton';
import { menuItems } from './menuItems';

interface SidebarMenuProps {
  isMobile?: boolean;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ isMobile = false }) => {
  return (
    <>
      <nav className="flex-1 overflow-y-auto py-4 no-scrollbar">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <MenuItem item={item} isMobile={isMobile} />
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-t p-4">
        <LogoutButton />
      </div>
    </>
  );
};
