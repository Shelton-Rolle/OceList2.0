export default function FormatRepoName(repo_name: string): string {
    let name = '';

    const split = repo_name.split('.');

    for (let i = 0; i < split.length; i++) {
        name = `${name}${split[i]}`;
    }

    return name;
}
