import languages from '@/consts/languages';
import { inter } from '@/fonts';
import { LanguageCheckboxProps, LanguageDropdownProps } from '@/types/props';
import { useState } from 'react';
import { GoChevronDown, GoChevronUp, GoCheck } from 'react-icons/go';
import { IoReloadCircleSharp } from 'react-icons/io5';

export default function LanguageDropdown({
    filterLanguages,
    setFilterLanguages,
}: LanguageDropdownProps) {
    const [showLanguages, setShowLanguages] = useState<boolean>(false);

    const LanguageCheckbox = ({ language }: LanguageCheckboxProps) => {
        const updateFilterLanguages = () => {
            const index = filterLanguages.indexOf(language);
            const languagesCopy = [...filterLanguages];

            if (index < 0) {
                setFilterLanguages([...filterLanguages, language]);
            } else {
                languagesCopy.splice(index, 1);
                setFilterLanguages(languagesCopy);
            }
        };

        return (
            <button
                className={`p-4 text-start bg-slate-100 rounded-md flex items-center justify-between`}
                onClick={updateFilterLanguages}
            >
                {language} {filterLanguages.includes(language) && <GoCheck />}
            </button>
        );
    };

    return (
        <div className="relative w-full mt-6">
            <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row lg:items-center lg:justify-between">
                <button
                    className={`font-bold text-base lg:text-xl flex items-center gap-9 ${inter.className}`}
                    onClick={() => setShowLanguages(!showLanguages)}
                >
                    Select Languages{' '}
                    {showLanguages ? <GoChevronUp /> : <GoChevronDown />}
                </button>
                <button
                    className={`font-bold text-sm lg:text-base flex items-center gap-3 ${
                        inter.className
                    } ${
                        filterLanguages.length > 0
                            ? 'text-black'
                            : 'text-gray-400'
                    }`}
                    onClick={() => setFilterLanguages([])}
                    disabled={filterLanguages.length < 1}
                >
                    Reset Languages
                    <IoReloadCircleSharp size={22} />
                </button>
            </div>
            {showLanguages && (
                <div className="absolute top-full left-0 flex flex-col justify-start z-20 max-h-96 overflow-y-scroll bg-white w-full p-3 gap-4 border-2 border-slate-100 rounded-md">
                    {Object.keys(languages).map((lang, index) => (
                        <LanguageCheckbox language={lang} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
}
