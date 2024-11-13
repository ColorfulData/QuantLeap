// src/components/ui/DropdownMenu.tsx

"use client";

import React from "react";
import { Menu } from "@headlessui/react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  label: React.ReactNode;
  items: Array<{
    label: string;
    onClick: () => void;
  }>;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        as="div" // Changed to div to prevent nested button issues
        className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-text-primary bg-background-header bg-opacity-80 rounded-md hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition cursor-pointer"
      >
        {label}
      </Menu.Button>
      <Menu.Items className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-background-elevated border border-border focus:outline-none z-50">
        <div className="py-1">
          {items.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={cn(
                    active
                      ? "bg-background-header text-text-primary"
                      : "text-text-primary",
                    "w-full text-left px-4 py-2 text-sm cursor-pointer transition bg-opacity-60 hover:bg-opacity-80"
                  )}
                >
                  {item.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default DropdownMenu;
