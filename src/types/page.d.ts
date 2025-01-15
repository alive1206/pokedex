import { TypePokemon } from "@/types";

declare global {
  interface Pokemon {
    id?: string;
    name?: string;
    type?: TypePokemon;
  }
}
