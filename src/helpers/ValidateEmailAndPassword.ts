export default async function ValidateEmailAndPassword(
    email: string | undefined,
    password: string | undefined
): Promise<{ success: boolean; error: string | undefined }> {
    if (email === undefined)
        return {
            success: false,
            error: 'email/missing',
        };

    if (password === undefined)
        return {
            success: false,
            error: 'password/missing',
        };

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat))
        return {
            success: false,
            error: 'email/invalid',
        };
    const passwordFormat =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!password.match(passwordFormat))
        return {
            success: false,
            error: 'password/invalid',
        };

    return {
        success: true,
        error: undefined,
    };
}
