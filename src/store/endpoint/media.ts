export default {
  fetchMedia: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" + new URLSearchParams(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")).toString()
      : "";
    return "media" + queryString;
  },
  uploadMedia: () => "media/upload",
};
