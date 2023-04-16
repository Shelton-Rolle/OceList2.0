import Link from 'next/link';
import {
    GoRepoForked,
    GoRepo,
    GoLock,
    GoStar,
    GoEye,
    GoMarkGithub,
    GoBrowser,
} from 'react-icons/go';
import { ReactNode, useState } from 'react';
import languages from '@/consts/languages';
import {
    ProjectCardProps,
    CardMenuItemProps,
    LanguageProps,
    StatsProps,
    LinksProps,
} from '@/types/props';

export default function ProjectCard({ project }: ProjectCardProps) {
    const [cardDetails, setCardDetails] = useState<string>('language');

    return (
        <article className="relative rounded-md overflow-hidden bg-black text-white duration-200 hover:bg-slate-900 w-xs">
            <Link href={`/projects/${project?.name}`}>
                <div className="flex items-center gap-3 mb-12 pt-5 px-5 text-base lg:text-lg">
                    {project?.private ? <GoLock /> : <GoRepo />}
                    <p>{project?.full_name}</p>
                </div>
            </Link>
            <div className="w-full">
                <div className="flex ml-5">
                    <CardMenuItem
                        label="Language"
                        onClick={setCardDetails}
                        clickValue="language"
                        active={cardDetails === 'language'}
                    />
                    <CardMenuItem
                        label="Stats"
                        onClick={setCardDetails}
                        clickValue="stats"
                        active={cardDetails === 'stats'}
                    />
                    <CardMenuItem
                        label="Links"
                        onClick={setCardDetails}
                        clickValue="links"
                        active={cardDetails === 'links'}
                    />
                </div>
                <div className="bg-[#1F2020] w-full p-5 border-t border-white border-opacity-20">
                    {cardDetails === 'language' ? (
                        <Language language={project?.language} />
                    ) : cardDetails === 'stats' ? (
                        <Stats
                            forks={project?.forks_count}
                            stargazers={project?.stargazers_count}
                            subscribers={project?.subscribers_count}
                        />
                    ) : cardDetails === 'links' ? (
                        <Links
                            repo={project?.html_url}
                            homepage={project?.homepage}
                        />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </article>
    );
}

export function CardMenuItem({
    label,
    onClick,
    active,
    clickValue,
}: CardMenuItemProps) {
    return (
        <button
            onClick={() => onClick(clickValue)}
            className={`pt-1 px-4 rounded-tl-md rounded-tr-md -mb-[1px] ${
                active
                    ? 'bg-[#1F2020] border-x border-t border-white border-opacity-20'
                    : 'bg-transparent'
            }`}
        >
            {label}
        </button>
    );
}

export function Language({ language }: LanguageProps) {
    const displayData = languages[language?.toLowerCase()];

    return (
        <div className="flex items-center gap-2">
            <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: displayData?.hex }}
            />
            <p>{language ? language : 'N/A'}</p>
        </div>
    );
}

export function Stats({ forks, stargazers, subscribers }: StatsProps) {
    function kFormatter(num: number) {
        const thousandth = Math.floor(num / 1000);

        return num > 999 ? thousandth.toString() + 'k' : num;
    }

    const Stat = ({ children }: { children: ReactNode | ReactNode[] }) => (
        <div className="flex gap-2 items-center text-sm">{children}</div>
    );
    return (
        <div className="flex items-center gap-6">
            <Stat>
                <GoRepoForked size={18} />
                {kFormatter(forks)}
            </Stat>
            <Stat>
                <GoStar size={18} />
                {kFormatter(stargazers)}
            </Stat>
            <Stat>
                <GoEye size={18} />
                {kFormatter(subscribers)}
            </Stat>
        </div>
    );
}

export function Links({ repo, homepage }: LinksProps) {
    const ProjectLink = ({
        href,
        children,
    }: {
        href: string;
        children: ReactNode | ReactNode[];
    }) => {
        return (
            <a href={href} className="flex items-center gap-3">
                {children}
            </a>
        );
    };

    return (
        <div className="flex items-center justify-between">
            <ProjectLink href={repo}>
                <GoMarkGithub />
                Repository
            </ProjectLink>
            {homepage && (
                <ProjectLink href={homepage}>
                    <GoBrowser />
                    HomePage
                </ProjectLink>
            )}
        </div>
    );
}
