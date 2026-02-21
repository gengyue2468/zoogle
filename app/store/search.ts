import { create } from "zustand";

interface SearchState {
  searchValue: string;
  setSearchValue: (v: string) => void;

  voiceDialogOpen: boolean;
  setVoiceDialogOpen: (open: boolean) => void;

  imageSearchMode: boolean;
  setImageSearchMode: (open: boolean) => void;
  openImageSearchPanel: () => void;
  closeImageSearchPanel: () => void;

  imageUrl: string;
  setImageUrl: (v: string) => void;

  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchValue: "",
  setSearchValue: (v) => set({ searchValue: v }),

  voiceDialogOpen: false,
  setVoiceDialogOpen: (open) => set({ voiceDialogOpen: open }),

  imageSearchMode: false,
  setImageSearchMode: (open) => set({ imageSearchMode: open }),
  openImageSearchPanel: () => set({ imageSearchMode: true }),
  closeImageSearchPanel: () => set({ imageSearchMode: false }),

  imageUrl: "",
  setImageUrl: (v) => set({ imageUrl: v }),

  isDragging: false,
  setIsDragging: (v) => set({ isDragging: v }),
}));
