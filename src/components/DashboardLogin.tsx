import { useState } from 'react';
import LoginInput from './LoginInput';
import Button from './Button';
import ValidateEmailAndPassword from '@/helpers/ValidateEmailAndPassword';

export default function DashboardLogin() {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [emailError, setEmailError] = useState<string | undefined>();
    const [passwordError, setPasswordError] = useState<string | undefined>();

    async function HandleLogin() {
        const valid = ValidateEmailAndPassword(email, password);
    }

    return (
        <section className="w-full h-screen flex items-center">
            <form className="flex flex-col gap-4">
                <h1 className="font-roboto font-medium text-2xl">
                    Dashboard Login
                </h1>
                <LoginInput
                    id="email"
                    label="Email"
                    placeholder="example@email.com"
                    error={emailError ? emailError : undefined}
                    HandleChange={setEmail}
                />
                <LoginInput
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
