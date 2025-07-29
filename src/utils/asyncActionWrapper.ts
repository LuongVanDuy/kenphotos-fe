export const asyncActionWrapper = async (asyncFn: () => Promise<any>, onSuccess: (data?: any) => void, onFailure: (error: string) => void) => {
  try {
    const response = await asyncFn();
    if (response) onSuccess(response);
  } catch (error: any) {
    const message = error?.message || "Unknown error";
    onFailure(message);
  }
};
