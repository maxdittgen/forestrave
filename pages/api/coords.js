// pages/api/coords.js
import crypto from 'crypto';

const VALID_HASHES = new Set([
  '52ae6769b92a47fe01fd4c6fccabf08f46f6feadc1f9c3f051b6ead630a5dacc', // 2tb
  'a3fb8c0cd61e98d9aa66e58caa01cd69190cba49ecd4a964dc4ead5114deeb1a', // suyean
  '0b3dc19ffb81d044ffb38bfbcbdab5b761a3a56ab1a32385b0dc0b0bdfd3eaf9', // dykdyl
  'dfa01e5f7269190a27bdf228904e7f786bbd38fd565cc0c5276c8b89f2a10e95', // yoob
  'd7132ae8ae0ddc4764ea37e42f0a5cea7d8bff653a7eafe427067592d8b07965', // djttgen
  '952f32838dab4f1c563a2d43524b228918a606c0530032dc17e6ee97fa666058', // marcs
  '488ac2c3603a97e003cc26563560bf0483351b517f7744fbda8ac554a8c7574c',  // djian
  '53c9fb2cae94567f0e4d2c198e6655dd4ed3b03b58fed3f1e4d6c9e3de0c10d5'  // ephemeralforest
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
    return res.status(200).json({
      coordinates: `42°18'46.9"N 76°20'56.6"W`,
      instructions: `park at coordinates. follow trail into woods. cross stream. turn left. follow music. rave.`
    });
  } else {
    return res.status(401).json({ error: 'Incorrect passkey' });
  }
}
