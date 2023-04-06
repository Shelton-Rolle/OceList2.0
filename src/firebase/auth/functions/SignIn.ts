import auth from '@/firebase/auth/init';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default async function SignIn(email: string, password: string) {
    let result: { success: boolean; error?: string } = { success: false };

    await signInWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
            const user = credentials.user;

            if (user) result = { success: true };
        })
        .catch((error) => {
            result.error = error.code;
        });

    return result;
}
