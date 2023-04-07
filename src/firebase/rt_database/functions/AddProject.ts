import { GetRepository } from '@/octokit/functions';
import { ref, set } from 'firebase/database';
import database from '../init';

export default async function AddProject(
    owner_name: string,
    repo_name: string
) {
    let response: { success: boolean; error: string | undefined } = {
        success: false,
        error: undefined,
    };
    const today = new Date();
    let date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    let month =
        today.getMonth() + 1 < 10
            ? `0${today.getMonth() + 1}`
            : today.getMonth() + 1;
    let year = today.getFullYear();

    await GetRepository(owner_name, repo_name).then(async ({ data, error }) => {
        if (error)
            response = {
                success: false,
                error: 'request failed',
            };

        if (data) {
            await set(ref(database, `/projects/${data?.name}`), {
                ...data,
                upload_date: `${date}/${month}/${year}`,
            })
                .then(() => {
                    response = {
                        success: true,
                        error: undefined,
                    };
                })
                .catch((error) =>
                    console.error(`${error.code} - ${error.message}`)
                );
        } else {
            response = {
                success: false,
                error: 'request failed',
            };
        }
    });

    return response;
}
