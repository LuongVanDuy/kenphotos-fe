/**
 * WordPress-style slugify function
 * Converts a title to a URL-friendly slug
 * Based on WordPress sanitize_title() function
 */
export const slugify = (title: string): string => {
  if (!title) return "";

  return (
    title
      // Convert to lowercase
      .toLowerCase()
      // Remove diacritics (accents)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // Replace spaces and special characters with hyphens
      .replace(/[^a-z0-9\s-]/g, "")
      // Replace multiple spaces/hyphens with single hyphen
      .replace(/[\s-]+/g, "-")
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, "")
      // Limit length (WordPress default is 200 characters)
      .substring(0, 200)
  );
};

/**
 * Generate a unique slug by appending a number if the slug already exists
 * @param baseSlug - The base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export const generateUniqueSlug = (
  baseSlug: string,
  existingSlugs: string[]
): string => {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
};
