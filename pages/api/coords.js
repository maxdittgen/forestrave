import crypto from 'crypto';

const VALID_HASHES = new Set([
  // SHA-256 of each of our 10 passwords:
  '07c11590aef02e42ddd64334d8e4aa8b178626aa8e70e1d707c83c8e64f4fc25',
  '53325fa256cfa65717b2f79cef5f1af610d10967ab525b6c0d9c1dbee3032872',
  '5bd64e39363ad3ba117634555a72f6cd1c473eea93325a1047a92efce603af0c',
  '616be2d738a0eb636e39825a34cd95760bc071138e002429616770292308701f',
  '3bbf69fd7063ee5891ca23fa341cb47505269eb2d557bd331f1d8f3e25dec847',
  '95d8c7048ee80fc6e48214e37182e3b095e9871f951dbab863b8a801f88225e5',
  '2ea8ebfbccd23e45ad2d1141c16d195e113a53414203b2ccf522c6b62b1bf67a',
  '43a45178e6ec508d431919dbf813e1d95429a902c678ed16b2435eb5a1f46ca0',
  '39a5d851c85243f14a60813ca7f91127ba1f090ffd438b6604dc77635116a15a',
  'b792a35cc14e0cb7ed2cb9b0ba964f7f20fa68a7b69470b36733e41b2ba3d2a9'
]);

function hashPassword(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { password } = req.body || {};
  if (typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }
  const hashed = hashPassword(password);
  if (VALID_HASHES.has(hashed)) {
    return res
      .status(200)
      .json({ coordinates: `42°18'46.9"N  76°20'56.6"W` });
  } else {
    return res.status(401).json({ error: 'Incorrect passkey' });
  }
}
