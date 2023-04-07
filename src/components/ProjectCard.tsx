import Link from 'next/link';
import { GoMarkGithub, GoLinkExternal } from 'react-icons/go';
import FormatRepoName from '@/helpers/FormatRepoName';

interface ProjectCardProps {
    project: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="project-card bg-cardBg p-6 rounded-md hover:shadow-lg border-2 border-black border-opacity-5 font-poppins duration-300">
            <p className="font-medium text-xl">{project?.name}</p>
            <p className="font-light text-sm">{project?.owner?.login}</p>
            <div className="links flex items-center justify-end gap-4 mt-7">
                <a
                    href={project?.html_url}
                    target="_blank"
                    className="hover:text-blue-400 duration-200 cursor-pointer"
                >
                    <GoMarkGithub size={18} />
                </a>
                {project?.homepage && (
                    <a
                        href={project?.homepage}
                        target="_blank"
                        className="hover:text-blue-400 duration-200 cursor-pointer"
                    >
                        <GoLinkExternal size={18} />
                    </a>
                )}
                <Link
                    href={`/projects/${FormatRepoName(project.name)}`}
                    className="text-sm lowercase font-medium hover:underline hover:text-blue-400 duration-200 ml-auto cursor-pointer"
                >
                    View More
                </Link>
            </div>
        </article>
    );
}
