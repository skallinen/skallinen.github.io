// Fictional people only. example.com is reserved and never delivers mail.
export const club = { id: 'testbed-club', name: 'Better Book Club' };

export const personas = [
  { uid: 'aino-lehtola', name: 'Aino Lehtola', email: 'aino.lehtola@example.com', member: true, organizer: true, role: 'tester' },
  { uid: 'mikko-saarinen', name: 'Mikko Saarinen', email: 'mikko.saarinen@example.com', member: true, role: 'tester' },
  { uid: 'priya-raman', name: 'Priya Raman', email: 'priya.raman@example.com', member: true, role: 'tester' },
  { uid: 'tomas-berg', name: 'Tomas Berg', email: 'tomas.berg@example.com', member: true, role: 'tester' },
  { uid: 'leena-koski', name: 'Leena Koski', email: 'leena.koski@example.com', member: true, role: 'tester' },
  { uid: 'grace-okafor', name: 'Grace Okafor', email: 'grace.okafor@example.com', member: true, role: 'background' },
  { uid: 'oskar-nystrom', name: 'Oskar Nyström', email: 'oskar.nystrom@example.com', member: true, role: 'background' },
  // Signs in fine but belongs to no club: exercises the "No club yet" path.
  { uid: 'noora-laine', name: 'Noora Laine', email: 'noora.laine@example.com', member: false, role: 'outsider' },
];

// Submitted responses by the background members. `at` is hours after the
// day opened (or after it closed, for catch-up).
export const backgroundActivity = [
  { uid: 'grace-okafor', work: 'P01', at: 8, rating: 5, comment: 'Read it twice over coffee. Short and it stayed with me all morning.' },
  { uid: 'grace-okafor', work: 'E01', at: 20, rating: 4, comment: 'Sharper than I expected. I kept arguing with it on the tram.' },
  { uid: 'grace-okafor', work: 'P05', at: 9, rating: 4, comment: 'Quiet and a little chilling.' },
  { uid: 'oskar-nystrom', work: 'P01', at: 10, catchUp: true, rating: 3, comment: 'Caught up late. Nice, but not really my kind of poem.' },
  { uid: 'oskar-nystrom', work: 'S26', at: 6, catchUp: true, rating: 5, comment: 'Needed a map. Loved it anyway.' },
  { uid: 'oskar-nystrom', work: 'E43', at: 12, rating: 4, comment: 'Did not expect to care about toads this much.' },
];

// Extra responses for the feature tour only (TOUR_SEED=1): on today's texts,
// by category. `ago` is minutes before seeding, clamped to after the day opened.
export const tourActivity = [
  { uid: 'grace-okafor', category: 'poem', ago: 90, rating: 5, comment: 'Read it twice over coffee. Short and it stayed with me all morning.' },
  { uid: 'oskar-nystrom', category: 'poem', ago: 50, rating: 3, comment: 'Nice, but not really my kind of poem.' },
  { uid: 'priya-raman', category: 'poem', ago: 20, rating: 0, comment: 'Did nothing for me, and I tried twice. Zero stars, honestly given.' },
  { uid: 'grace-okafor', category: 'story', ago: 80, rating: 4, comment: 'Needed a map. Loved it anyway.' },
  { uid: 'oskar-nystrom', category: 'story', ago: 40, rating: 5, comment: 'I will be thinking about this one all week.' },
  { uid: 'grace-okafor', category: 'essay', ago: 70, rating: 4, comment: 'Sharper than I expected. I kept arguing with it on the tram.' },
  { uid: 'priya-raman', category: 'essay', ago: 30, rating: 3, comment: 'Good points, a little long for a lunch break.' },
];
