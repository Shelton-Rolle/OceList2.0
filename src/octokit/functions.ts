import octokit from './init';
interface OctokitResponse {
    data: any;
    error: { status: number; message: string } | undefined;
}

export async function GetRepository(owner: string, repo: string) {
    // Create Project Interface for the data
    let response: OctokitResponse = {
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

export async function GetRepositoryREADME(owner: string, repo: string) {
    let response: OctokitResponse = {
        data: null,
        error: undefined,
    };
    console.log('Owner: ', owner);
    console.log('Repo: ', repo);
    await octokit
        .request('GET /repos/{owner}/{repo}/readme', {
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
