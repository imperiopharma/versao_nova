
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-2 w-full", className)}>
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder={placeholder}
          className="pl-10 bg-white border-gray-200 focus:border-imperio-navy/30 h-10 rounded-lg shadow-sm w-full"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
