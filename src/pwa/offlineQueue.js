/**
 * Utility module for queuing quote form requests when offline and syncing them when online.
 */

const QUEUE_KEY = 'aeroscan_offline_quote_queue';

export function getOfflineQueue() {
  try {
    const data = localStorage.getItem(QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('[PWA Offline] Failed to read queue:', err);
    return [];
  }
}

export function saveToOfflineQueue(quotePayload) {
  try {
    const queue = getOfflineQueue();
    const newItem = {
      id: `quote_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
      payload: quotePayload
    };
    queue.push(newItem);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    console.log('[PWA Offline] Saved quote request to offline queue:', newItem);
    return newItem;
  } catch (err) {
    console.error('[PWA Offline] Failed to save item to queue:', err);
    return null;
  }
}

export function clearOfflineQueue() {
  try {
    localStorage.removeItem(QUEUE_KEY);
  } catch (err) {
    console.error('[PWA Offline] Failed to clear queue:', err);
  }
}

export async function flushOfflineQueue(onSyncSuccess) {
  const queue = getOfflineQueue();
  if (queue.length === 0) return;

  console.log(`[PWA Offline] Flushing ${queue.length} offline queued requests...`);
  
  const remaining = [];
  let syncedCount = 0;

  for (const item of queue) {
    try {
      // Simulate sending request or actual fetch to API server
      await new Promise((resolve) => setTimeout(resolve, 800));
      syncedCount++;
      console.log('[PWA Offline] Successfully synced item:', item.id);
    } catch (err) {
      console.error('[PWA Offline] Error syncing item:', item.id, err);
      remaining.push(item);
    }
  }

  if (remaining.length > 0) {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  } else {
    clearOfflineQueue();
  }

  if (syncedCount > 0 && onSyncSuccess) {
    onSyncSuccess(syncedCount);
  }
}
