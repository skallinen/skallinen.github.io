// Test bed only: every Auth instance the client creates talks to the emulator.
import { getAuth as realGetAuth, connectAuthEmulator } from 'firebase/auth';
import { host, ports } from '../config.mjs';
export * from 'firebase/auth';
export function getAuth(app) {
  const auth = realGetAuth(app);
  if (!auth.emulatorConfig) connectAuthEmulator(auth, `http://${host}:${ports.auth}`, { disableWarnings: true });
  return auth;
}
