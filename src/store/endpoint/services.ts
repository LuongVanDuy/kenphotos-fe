export default {
  fetchServices: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== null && v !== "")
            .map(([k, v]) => [k, typeof v === "boolean" ? String(v) : v])
        ).toString()
      : "";
    return "services" + queryString;
  },
  fetchService: (id: number) => `services/${id}`,
  createService: () => "services",
  updateService: (id: number) => `services/${id}`,
  deleteService: () => `services/delete`,
  restoreService: () => `services/restore`,
  permanentDeleteService: () => `services/permanent`,

  // Public endpoints
  fetchPublicServices: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== null && v !== "")
            .map(([k, v]) => [k, typeof v === "boolean" ? String(v) : v])
        ).toString()
      : "";
    return "public/services" + queryString;
  },
  fetchPublicService: (slug: string) => `public/services/${slug}`,
};
