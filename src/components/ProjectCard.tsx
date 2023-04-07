interface ProjectCardProps {
    project: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article>
            <p>{project?.name}</p>
            <p>{project?.owner?.login}</p>
        </article>
    );
}
