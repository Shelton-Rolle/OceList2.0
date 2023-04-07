import { GetRepository } from '@/octokit/functions';
import { ref, set } from 'firebase/database';
import database from '../init';
import GetCurrentDate from '@/helpers/GetCurrentDate';

export default async function AddProject(
    owner_name: string,
    repo_name: string
) {
    let response: { success: boolean; error: string | undefined } = {
        success: false,
        error: undefined,
    };
    const date = GetCurrentDate();

    await GetRepository(owner_name, repo_name).then(async ({ data, error }) => {
        if (error)
            response = {
                success: false,
                error: 'request failed',
            };

        if (data) {
            await set(ref(database, `/projects/${data?.name}`), {
                ...data,
                upload_date: date,
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
