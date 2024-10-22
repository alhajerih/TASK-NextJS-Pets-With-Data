"use client";

import { useState } from "react";

import PetsHeader from "./PetsHeader";
import PetsList from "./PetsList";

function PetsContainer({ pets }) {
  const [query, setQuery] = useState("");

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center ">
      <PetsHeader setQuery={setQuery} />
      <PetsList pets={filteredPets} />
    </div>
  );
}

export default PetsContainer;
