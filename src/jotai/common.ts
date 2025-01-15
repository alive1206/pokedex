import { atomWithStorage } from "jotai/utils";

export const favoriteState = atomWithStorage("favorites", [] as any[]);
