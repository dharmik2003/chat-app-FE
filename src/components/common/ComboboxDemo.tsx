"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Typography from "./Typography";

interface OptionProps {
  label: string;
  value: string | number;
}

interface Props {
  mainClassName?: string;
  mainContentClassName?: string;
  searchPlaceholder?: string;
  options: OptionProps[];
  placeholder: string;
  notFoundMessage: string;
  value: string;
  onChange: (val: string) => void;
  triggerMenuCSS?: string;
}

export function ComboboxDemo({
  mainClassName,
  mainContentClassName,
  options,
  placeholder,
  searchPlaceholder = "Search options...",
  notFoundMessage = "No matching results.",
  value,
  onChange,
  triggerMenuCSS,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  const handleButtonClick = () => {
    setOpen((prevState) => !prevState);
  };

  const handleSelect = (currentValue: string) => {
    onChange(currentValue);
    setOpen(false);
    // Reset search query when closing
    setSearchQuery("");
  };

  const selectedLabel = options.find(
    (option) => option.value === Number(value)
  )?.label;

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setSearchQuery("");
      }}
    >
      <PopoverTrigger asChild className={cn("relative", mainClassName)}>
        <div
          aria-expanded={open}
          className="w-[200px] px-4 py-2 max-h-[40px] cursor-pointer rounded-[6px] justify-between font-[500] border leading-[24px] border-[#D0D5DD] text-[#1D2939] focus-visible:!border-[1.6px] hover:border-[#D0D5DD]  hover:bg-[#F7F7F7] active:bg-[#F7F7F7] disabled:text-[rgba(29,41,57,0.40)] disabled:pointer-events-none focus-visible:ring-[#334155] focus-visible:border-none"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleButtonClick();
          }}
        >
          {value ? (
            selectedLabel
          ) : (
            <Typography
              label={placeholder}
              color="#98A2B3"
              fontWeight={400}
              size={16}
              className="leading-6 tracking-[-0.16px]"
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className={cn("p-2 z-[120] ", mainContentClassName)}>
        <Command className={triggerMenuCSS}>
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            startIcon={<SearchIcon className="size-4 shrink-0 opacity-50" />}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2 w-full text-ellipsis whitespace-nowrap max-h-[40px]  shadow-none "
          />
          <CommandList>
            <CommandGroup className="!p-0">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value.toString()}
                    onSelect={handleSelect}
                    className={cn(
                      value === option.value.toString()
                        ? "bg-[#F0F0F0] !hover:bg-[#F0F0F0]"
                        : "hover:bg-[#F7F7F7]",
                      "min-h-[36px] px-2 py-[6px] rounded-[6px] mt-1 !w-full flex justify-between items-center cursor-pointer"
                    )}
                  >
                    <div>{option.label}</div>
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>{notFoundMessage}</CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
