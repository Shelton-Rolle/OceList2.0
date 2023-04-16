import {
    Dispatch,
    HTMLInputTypeAttribute,
    ReactNode,
    SetStateAction,
} from 'react';

export interface ButtonProps {
    children: ReactNode | ReactNode[];
    color: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
    style: 'button' | 'link';
}

export interface DashboardProps {
    projects: any[];
}

export interface LoginInputProps {
    id: string;
    label: string;
    placeholder: string;
    error?: string;
    HandleChange: Dispatch<SetStateAction<string | undefined>>;
    type: HTMLInputTypeAttribute | undefined;
}

export interface NavItemProps {
    label: string | ReactNode;
    href: string;
    active: boolean;
}

export interface RootLayoutProps {
    children: ReactNode | ReactNode[];
}

export interface BrowsePageProps {
    projects: any[];
}

export interface ProjectPageProps {
    name: string;
    project: any;
}

export interface DashboardPageProps {
    projects: any[];
}

export interface ProjectTableRowProps {
    name: string;
    owner: string;
    upload_date: string;
    index: number;
}

export interface HomePageProps {
    highlightedProjects: any[];
}

export interface ProjectCardProps {
    project: any;
}
export interface CardMenuItemProps {
    label: string;
    onClick: Dispatch<SetStateAction<string>>;
    active: boolean;
    clickValue: string;
}

export interface LanguageProps {
    language: string;
}

export interface StatsProps {
    forks: number;
    stargazers: number;
    subscribers: number;
}

export interface LinksProps {
    repo: string;
    homepage?: string;
}
