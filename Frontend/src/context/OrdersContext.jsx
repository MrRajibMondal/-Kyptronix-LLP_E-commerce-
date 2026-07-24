import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const OrdersContext = createContext(null);
const STORAGE_KEY = 'circuit-co.orders';

export const CANCEL_REASONS = [
  'Ordered by mistake',
  'Found a better price elsewhere',
  'Delivery is taking too long',
  'Changed my mind',
  'Item no longer needed',
  'Other'
];

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function genOrderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CC-${stamp}-${rand}`;
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadInitial);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  // Backend orders use `orderId` (e.g. "CC-XXXX") as their human-readable key.
  // The rest of this app's UI reads `order.id`, so normalize every order
  // coming back from the API to have both.
  function normalizeOrder(order) {
    if (!order) return order
    return { ...order, id: order.orderId || order.id }
  }

  // 1. Fetch Orders from Backend on Mount
<<<<<<< HEAD
=======
=======
  // 1. Fetch Orders from Backend on Mount (Gracefully ignores 401s for guests)
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get('/orders');
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
      const backendOrders = res.data?.orders
      if (Array.isArray(backendOrders)) {
        setOrders(backendOrders.map(normalizeOrder));
      }
    } catch (err) {
      console.error('Error fetching orders from backend:', err);
<<<<<<< HEAD
=======
=======
      if (Array.isArray(res.data) && res.data.length > 0) {
        setOrders(res.data);
      }
    } catch (err) {
      // Suppress console error noise for guests (401 Unauthorized)
      if (err.response?.status !== 401) {
        console.error('Error fetching orders from backend:', err);
      }
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 2. Persist Orders to LocalStorage as Fallback
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Storage unavailable — fail silently
    }
  }, [orders]);

  // 3. Place/Create Order (Backend + Local State Fallback)
  const placeOrder = async (orderPayload) => {
    const localId = genOrderId();
    
    // Construct order shape matching frontend & backend fields
    const formattedOrder = {
      id: localId,
      items: orderPayload.items || [],
      address: orderPayload.address || null,
      subtotal: orderPayload.subtotal || 0,
      discount: orderPayload.discount || 0,
      gst: orderPayload.gst || 0,
      deliveryFee: orderPayload.deliveryFee || 0,
      total: orderPayload.total || 0,
      coupon: orderPayload.coupon || null,
      paymentMethod: orderPayload.paymentMethod || 'Cash on Delivery',
      status: 'placed',
      placedAt: new Date().toISOString(),
      cancelledAt: null,
      cancelReason: null,
      cancelNote: '',
      movedToWishlist: false
    };

    // Optimistic UI update
    setOrders((prev) => [formattedOrder, ...prev]);

    try {
      const res = await API.post('/orders', orderPayload);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
      const backendOrder = normalizeOrder(res.data?.order);
      const finalId = res.data?.orderId || backendOrder?.id || localId;

      // Update local state with official backend response
      setOrders((prev) =>
        prev.map((o) => (o.id === localId ? (backendOrder || { ...o, id: finalId }) : o))
      );

      return finalId;
    } catch (err) {
      console.error('Error creating order on backend:', err);
<<<<<<< HEAD
=======
=======
      const backendOrder = res.data;
      
      // Update local state with official backend response
      setOrders((prev) =>
        prev.map((o) => (o.id === localId ? backendOrder : o))
      );
      
      return backendOrder._id || backendOrder.id || localId;
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Error creating order on backend:', err);
      }
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
      // Returns local order ID so checkout success screen still renders smoothly
      return localId;
    }
  };

  // Alias createOrder for backward compatibility
  const createOrder = placeOrder;

  // 4. Cancel Order (Supports both string reason or { reason, note, moveToWishlist } object)
  const cancelOrder = async (orderId, cancelDetails) => {
    let reason = 'Cancelled by user';
    let note = '';
    let moveToWishlist = false;

    if (typeof cancelDetails === 'string') {
      reason = cancelDetails;
    } else if (cancelDetails && typeof cancelDetails === 'object') {
      reason = cancelDetails.reason || reason;
      note = cancelDetails.note || '';
      moveToWishlist = !!cancelDetails.moveToWishlist;
    }

    // Local state update
    setOrders((prev) =>
      prev.map((o) => {
        const idMatch = o.id === orderId || o._id === orderId;
        return idMatch
          ? {
              ...o,
              status: 'cancelled',
              cancelledAt: new Date().toISOString(),
              cancelReason: reason,
              cancelNote: note,
              movedToWishlist: moveToWishlist
            }
          : o;
      })
    );

    try {
<<<<<<< HEAD
      const res = await API.patch(`/orders/${orderId}/cancel`, {
=======
<<<<<<< HEAD
      const res = await API.patch(`/orders/${orderId}/cancel`, {
=======
      const res = await API.put(`/orders/${orderId}/cancel`, {
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
        reason,
        note,
        moveToWishlist
      });

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
      const backendOrder = normalizeOrder(res.data?.order);
      if (backendOrder) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? backendOrder : o))
        );
      }
    } catch (err) {
      console.error('Error cancelling order on backend:', err);
<<<<<<< HEAD
=======
=======
      if (res.data) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId || o.id === orderId ? res.data : o))
        );
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Error cancelling order on backend:', err);
      }
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
    }
  };

  // 5. Get Order by ID
  const getOrder = (orderId) => {
    return (
      orders.find((o) => o.id === orderId || o._id === orderId) || null
    );
  };

  const value = {
    orders,
    loading,
    CANCEL_REASONS,
    fetchOrders,
    placeOrder,
    createOrder,
    cancelOrder,
    getOrder
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return ctx;
}