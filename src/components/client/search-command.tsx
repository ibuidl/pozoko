'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { atom, useAtom, useSetAtom } from 'jotai';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '../ui/button';

export const openAtom = atom(false);

export const SearchButton = () => {
  const setOpen = useSetAtom(openAtom);

  return (
    <Button
      variant="outline"
      className="w-[400px] h-8 bg-secondary text-muted-foreground"
      onClick={() => setOpen(true)}
    >
      <Search />
      Search for the creator or topic
    </Button>
  );
};

export const SearchCommand = () => {
  const [open, setOpen] = useAtom(openAtom);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search for the creator or topic" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Creator">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Topic">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
