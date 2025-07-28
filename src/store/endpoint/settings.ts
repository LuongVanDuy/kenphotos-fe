export default {
  fetchSetting: (namespace: string) => `settings/${namespace}`,
  upsertSetting: (namespace: string) => `settings/${namespace}`,
};
