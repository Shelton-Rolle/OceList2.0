import octokit from './init';

export async function GetRepository(owner: string, repo: string) {
    // Create Project Interface for the data
    let response: {
        data: any;
        error: { status: number; message: string } | undefined;
    } = {
        data: null,
        error: undefined,
    };

    await octokit
        .request('GET /repos/{owner}/{repo}', {
            owner,
            repo,
        })
        .then((res) => {
            response.data = res?.data;
        })
        .catch((error) => {
            response.error = { status: error.status, message: error.message };
        });

    return response;
}
