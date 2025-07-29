export default {
  fetchMedia: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== null && v !== "")
            .map(([k, v]) => [k, typeof v === "boolean" ? String(v) : v])
        ).toString()
      : "";
    return "media" + queryString;
  },
  fetchMediaById: (id: string) => `media/${id}`,
  uploadMedia: () => "media",
  updateMedia: (id: string) => `media/${id}`,
  deleteMedia: () => `media`,
};
