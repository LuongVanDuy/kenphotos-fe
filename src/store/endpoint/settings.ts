export default {
  fetchSetting: (namespace: string) => `settings/${namespace}`,
  upsertSetting: (namespace: string) => `settings/${namespace}`,
  fetchPublicSetting: (namespaces: string[]) => {
    const query = namespaces.join(",");
    return `public/settings?namespaces=${encodeURIComponent(query)}`;
  },
};
