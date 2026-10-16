// Test bed only: every Firestore instance the client creates talks to the emulator.
import { getFirestore as realGetFirestore, initializeFirestore as realInitializeFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { host, ports } from '../config.mjs';
export * from 'firebase/firestore';
const connected = new WeakSet();
const toEmulator = db => {
  if (!connected.has(db)) { connectFirestoreEmulator(db, host, ports.firestore); connected.add(db); }
  return db;
};
export function getFirestore(...args) { return toEmulator(realGetFirestore(...args)); }
export function initializeFirestore(...args) { return toEmulator(realInitializeFirestore(...args)); }
