// src/components/ui/Select.tsx

'use client';

import { Listbox } from '@headlessui/react';
import React from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { cn } from '@/lib/utils';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  return (
    <Listbox value={value} onChange={onValueChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full bg-secondary bg-opacity-80 border border-border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition">
          <span className="block truncate">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.props.value === value) {
                return child.props.children;
              }
            })?.[0] || 'Select Timeframe'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="h-5 w-5 text-muted" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 w-full bg-card bg-opacity-95 border border-border rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm z-50">
          {children}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => (
  <Listbox.Option
    className={({ active }) =>
      cn(
        active ? 'bg-secondary bg-opacity-80 text-foreground' : 'text-foreground',
        'cursor-pointer select-none relative py-2 pl-10 pr-4'
      )
    }
    value={value}
  >
    {({ selected, active }) => (
      <>
        <span className={cn(selected ? 'font-medium' : 'font-normal', 'block truncate')}>
          {children}
        </span>
        {selected ? (
          <span
            className={cn(
              active ? 'text-foreground' : 'text-primary',
              'absolute inset-y-0 left-0 flex items-center pl-3'
            )}
          >
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </>
    )}
  </Listbox.Option>
);
