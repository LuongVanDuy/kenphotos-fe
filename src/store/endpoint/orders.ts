export default {
  fetchOrders: (params?: Record<string, any>) => {
    const queryString = params
      ? '?' +
        new URLSearchParams(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== null && v !== '')
            .map(([k, v]) => [k, typeof v === 'boolean' ? String(v) : v])
        ).toString()
      : ''
    return 'orders' + queryString
  },
  fetchOrder: (id: number) => `orders/${id}`,
  createOrder: () => 'orders',
  createPublicOrder: () => 'public/orders',
  updateOrder: (id: number) => `orders/${id}`,
  deleteOrder: () => `orders/delete`,
  restoreOrder: () => `orders/restore`,
  permanentDeleteOrder: () => `orders/permanent`,
  sendOrder: (id: number) => `mail/send-order/${id}`,
  createContact: () => 'mail/contact',
}
