import { GetRepository } from '@/octokit/functions';
import { get, ref, set } from 'firebase/database';
import database from '../init';
import GetCurrentDate from '@/helpers/GetCurrentDate';
import FormatRepoName from '@/helpers/FormatRepoName';

export default async function AddProject(
    owner_name: string,
    repo_name: string
) {
    let existing_project = false;
    let response: { success: boolean; error: string | undefined } = {
        success: false,
        error: undefined,
    };
    const date = GetCurrentDate();

    const projects: any[] = await get(ref(database, '/projects'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            } else {
                return [];
            }
        })
        .catch((error) => {
            console.error(`${error.code} - ${error.message}`);
            return [];
        });

    for (let i = 0; i < projects.length, i++; ) {
        if (projects[i].name === repo_name) {
            existing_project = true;
            response = {
                success: false,
                error: 'project/exists',
            };
        }
    }

    if (!existing_project) {
        await GetRepository(owner_name, repo_name).then(
            async ({ data, error }) => {
                const name = FormatRepoName(repo_name);

                if (error)
                    response = {
                        success: false,
                        error: 'request/failed',
                    };

                if (data) {
                    await set(ref(database, `/projects/${name}`), {
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
                        error: 'request/failed',
                    };
                }
            }
        );
    }

    return response;
}
