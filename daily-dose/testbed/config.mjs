// Test bed constants. The demo-* project id makes the Firebase SDKs refuse to
// talk to production: demo projects exist only on the local emulators.
export const projectId = 'demo-daily-dose';
export const ports = { page: 5178, auth: 9199, firestore: 8290 };
export const host = '127.0.0.1';
export const firebaseConfig = {
  apiKey: 'demo-api-key',
  authDomain: `${projectId}.firebaseapp.com`,
  projectId,
  appId: '1:000000000000:web:testbed',
};
