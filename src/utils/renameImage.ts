export const slugifyFileName = (originalName: string): string => {
  const baseName = originalName.split(".").slice(0, -1).join(".");
  const ext = originalName.split(".").pop();
  const slug = baseName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug}.${ext}`;
};
