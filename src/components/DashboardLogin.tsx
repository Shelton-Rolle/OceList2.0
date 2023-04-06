import { FormEvent, useState } from 'react';
import LoginInput from './LoginInput';
import Button from './Button';
import ValidateEmailAndPassword from '@/helpers/ValidateEmailAndPassword';
import SignIn from '@/firebase/auth/functions/SignIn';
import { useRouter } from 'next/router';

export default function DashboardLogin() {
    const router = useRouter();

    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [emailError, setEmailError] = useState<string | undefined>();
    const [passwordError, setPasswordError] = useState<string | undefined>();

    async function HandleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setEmailError(undefined);
        setPasswordError(undefined);
        const { success, error } = await ValidateEmailAndPassword(
            email,
            password
        );
        if (error) {
            const parsed_error = error.split('/');
            switch (parsed_error[1]) {
                case 'missing':
                    switch (parsed_error[0]) {
                        case 'email':
                            setEmailError('The email field is required.');
                            break;
                        case 'password':
                            setPasswordError('The password field is required.');
                            break;
                    }
                    break;
                case 'invalid':
                    switch (parsed_error[0]) {
                        case 'email':
                            setEmailError('The email provided is invalid.');
                            break;
                        case 'password':
                            setPasswordError(
                                'The password provided is invalid. Password must be at least 6 characters with an uppercase, number and special character.'
                            );
                            break;
                    }
                    break;
            }
            return;
        }

        if (success) {
            await SignIn(email!, password!).then(({ success, error }) => {
                if (success) {
                    router.reload();
                    return;
                }

                if (error) {
                    switch (error) {
                        case 'auth/user-not-found':
                            setEmailError('No user was found with that email.');
                            break;
                        case 'auth/wrong-password':
                            setPasswordError('That password is incorrect.');
                            break;
                    }
                    return;
                }
            });
        }
    }

    return (
        <section className="w-full h-screen flex justify-center items-center lg:max-w-md lg:mx-auto">
            <form className="flex flex-col gap-4" onSubmit={HandleLogin}>
                <h1 className="font-roboto font-medium text-2xl">
                    Dashboard Login
                </h1>
                <LoginInput
                    type="text"
                    id="email"
                    label="Email"
                    placeholder="example@email.com"
                    error={emailError ? emailError : undefined}
                    HandleChange={setEmail}
                />
                <LoginInput
                    type="password"
                    id="password"
                    label="Password"
                    placeholder="abc123"
                    error={passwordError ? passwordError : undefined}
                    HandleChange={setPassword}
                />
                <div className="flex flex-col gap-2">
                    <Button style="button" color="black" type="submit">
                        Login
                    </Button>
                    <Button
                        style="link"
                        onClick={() => console.log('Clicked')}
                        color="#2563eb"
                    >
                        Forgot Password?
                    </Button>
                </div>
            </form>
        </section>
    );
}
