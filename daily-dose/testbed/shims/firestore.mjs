// Test bed only: every Firestore instance the client creates talks to the emulator.
import { getFirestore as realGetFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { host, ports } from '../config.mjs';
export * from 'firebase/firestore';
const connected = new WeakSet();
export function getFirestore(...args) {
  const db = realGetFirestore(...args);
  if (!connected.has(db)) { connectFirestoreEmulator(db, host, ports.firestore); connected.add(db); }
  return db;
}
