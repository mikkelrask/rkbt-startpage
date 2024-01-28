export const handleDropdownChange = (
  value: string | null,
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const categoryId = Number(value);
  setSelectedCategoryId(categoryId);
};
