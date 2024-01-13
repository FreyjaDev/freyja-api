import * as path from 'path';

import dotenv from 'dotenv';

const testEnv = dotenv.configDotenv({
  path: path.join(process.cwd(), 'environments', '.env.test.local'),
});

Object.assign(process.env, {
  ...testEnv.parsed,
});