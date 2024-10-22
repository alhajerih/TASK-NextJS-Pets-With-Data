`use server`;
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const baseUrl = "https://pets-react-query-backend.eapi.joincoded.com";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function fetchPets() {
  const response = await fetch(`${baseUrl}/pets`);

  const pets = await response.json();
  return pets;
}

export async function fetchPetsById(id) {
  try {
    const response = await fetch(`${baseUrl}/pets/${id}`);
    const pet = await response.json();

    return pet;
  } catch {
    return undefined;
  }
}

export async function createPet(fromData) {
  const petData = { ...Object.fromEntries(fromData), adopted: 0 };
  const response = await fetch(`${baseUrl}/pets`, {
    method: "POST",
    headers,
    body: JSON.stringify(petData),
  });
  const newPet = await response.json();
  // console.log(petData);
  revalidatePath("/pets");
  revalidatePath(`/pets/${id}`, "page");
  redirect(`/pets/${newPet.id}`);
}
export async function deletePet(id) {
  const response = await fetch(`${baseUrl}/pets/${id}`, {
    method: "DELETE",
  });
  revalidatePath("/pets");
  revalidatePath(`/pets/${id}`, "page");
  redirect("/pets");
}
