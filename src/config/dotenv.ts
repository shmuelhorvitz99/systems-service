import dotenv from 'dotenv';

/* istanbul ignore file */
const dotenvPath = process.env.LOAD_DEV_DOTENV ? '.env.dev' : '.env';

dotenv.config({ path: dotenvPath });
