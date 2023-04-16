interface LanguageObj {
    [key: string]: {
        hex: string;
    };
}

const languages: LanguageObj = {
    typescript: {
        hex: '#3178c6',
    },
    javascript: {
        hex: '#f1e05a',
    },
    css: {
        hex: '#563d7c',
    },
    scala: {
        hex: '#c22d40',
    },
    c: {
        hex: '#555555',
    },
    'objective-c': {
        hex: '#438eff',
    },
    html: {
        hex: '#e34c26',
    },
    kotlin: {
        hex: '#A97BFF',
    },
    java: {
        hex: '#b07219',
    },
    markdown: {
        hex: '#083fa1',
    },
    'c++': {
        hex: '#f34b7d',
    },
    python: {
        hex: '#3572A5',
    },
    rust: {
        hex: '#dea584',
    },
};

export default languages;
