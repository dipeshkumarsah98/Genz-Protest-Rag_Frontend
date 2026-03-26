import type { Message } from "@/types/chat";

const DB_NAME = "genz-rag-chat";
const DB_VERSION = 1;
const STORE_NAME = "messages";

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error("[Storage] Failed to open IndexedDB:", request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
  });

  return dbPromise;
}

/**
 * Save all messages to IndexedDB (replaces existing data)
 */
export async function saveMessages(messages: Message[]): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    // Clear existing messages and add new ones
    store.clear();

    for (const message of messages) {
      // Convert Date to ISO string for storage
      store.add({
        ...message,
        timestamp: message.timestamp.toISOString(),
      });
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error("[Storage] Failed to save messages:", error);
  }
}

/**
 * Load all messages from IndexedDB
 */
export async function loadMessages(): Promise<Message[]> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index("timestamp");

    return new Promise((resolve, reject) => {
      const request = index.getAll();

      request.onsuccess = () => {
        const messages = request.result.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })) as Message[];
        resolve(messages);
      };

      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("[Storage] Failed to load messages:", error);
    return [];
  }
}

/**
 * Clear all messages from IndexedDB
 */
export async function clearMessages(): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.clear();

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error("[Storage] Failed to clear messages:", error);
  }
}
