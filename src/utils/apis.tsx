const categoriesUrl = "/api/categories";
const linksUrl = "/api/links";
const baseUrl = `${import.meta.env.VITE_EXPRESS_API_BASE_URL as string}`;

function updateLink(id: number, data: any) {
  const url = `${baseUrl}${linksUrl}/${id}`;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function newLink(title: string, url: string, selectedCategoryId: number) {
  const data = {
    title: title,
    url: url,
    category: selectedCategoryId,
  };
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add link.");
      }
      console.log("Link added successfully!");
      // make toast
      toast({
        title: "Link tilføjet",
        description: "Linket er nu tilføjet til databasen.",
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteLink(id: number) {
  const url = `${baseUrl}${linksUrl}/${id}/delete`;
  return fetch(url, {
    method: "GET",
  });
}

export { updateLink, newLink, deleteLink };
