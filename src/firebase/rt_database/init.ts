import { getDatabase } from 'firebase/database';
import { app } from '@/firebase/init';

const database = getDatabase(app);
export default database;
