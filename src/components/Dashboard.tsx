import { FormEvent, useState } from 'react';
import Button from './Button';
import AddProject from '@/firebase/rt_database/functions/AddProject';
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { DashboardProps } from '@/pages/dashboard';

export default function Dashboard({ projects, error }: DashboardProps) {
    const router = useRouter();
    const [projectModalIsOpen, setProjectModalIsOpen] = useState<
        boolean | undefined
    >();
    const [repositoryName, setRepositoryName] = useState<string | undefined>();
    const [repositoryNameError, setRepositoryNameError] = useState<
        string | undefined
    >();
    const [repositoryOwner, setRepositoryOwner] = useState<
        string | undefined
    >();
    const [repositoryOwnerError, setRepositoryOwnerError] = useState<
        string | undefined
    >();
    const [submittingProject, setSubmittingProject] = useState<
        boolean | undefined
    >();

    async function AddNewProject(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmittingProject(true);
        if (repositoryName === undefined) {
            setRepositoryNameError('This field is required.');
            setSubmittingProject(false);
            return;
        }

        if (repositoryOwner === undefined) {
            setRepositoryOwnerError('This field is required.');
            setSubmittingProject(false);
            return;
        }

        await AddProject(repositoryOwner!, repositoryName!).then(
            ({ success, error }) => {
                if (success) router.reload();

                if (error) {
                    setRepositoryNameError(error);
                    setSubmittingProject(false);
                }
            }
        );
    }

    return (
        <section className="pt-6">
            <div className="flex justify-end mb-8">
                <Button
                    style="button"
                    color="black"
                    onClick={() => setProjectModalIsOpen(true)}
                >
                    Add Project
                </Button>
            </div>
            <div>
                <h1 className="font-roboto font-medium text-xl mb-3 lg:text-3xl">
                    Existing Projects
                </h1>
                <table className="w-full">
                    <thead className="text-xs md:text-base">
                        <tr className="grid grid-cols-12">
                            <td className="col-span-4 px-2 py-2 bg-gray-200 border-x border-x-gray-300 lg:text-xl">
                                Name
                            </td>
                            <td className="col-span-4 px-2 py-2 bg-gray-200 border-x border-x-gray-300 lg:text-xl">
                                Uploaded Date
                            </td>
                            <td className="col-span-4 px-2 py-2 bg-gray-200 border-x border-x-gray-300 lg:text-xl">
                                Actions
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {projects?.map((project, index) => (
                            <tr
                                key={index}
                                className={`grid grid-cols-12 ${
                                    index % 2 === 0
                                        ? 'bg-blue-200'
                                        : 'bg-transparent'
                                }`}
                            >
                                <td className="col-span-4 px-2 py-2 border border-gray-200">
                                    {project?.name}
                                </td>
                                <td className="col-span-4 px-2 py-2 border border-gray-200">
                                    {project?.upload_date}
                                </td>
                                <td className="col-span-4 px-2 py-2 border border-gray-200">
                                    Actions
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {projectModalIsOpen && (
                <div className="absolute top-0 left-0 w-full h-screen">
                    <div className="modal-overlay absolute w-full h-screen bg-black bg-opacity-80" />
                    <article className="absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md p-6 rounded-md">
                        <h2 className="font-roboto font-bold text-xl mb-2">
                            Add Projects
                        </h2>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={AddNewProject}
                        >
                            <div className="flex flex-col items-start gap-1">
                                {repositoryNameError && (
                                    <p className="text-xs font-poppins font-medium text-error mb-4">
                                        {repositoryNameError}
                                    </p>
                                )}
                                <input
                                    type="text"
                                    id="repository_name"
                                    placeholder="React"
                                    className="border border-ocGray rounded-md px-3 py-2 text-xs w-full outline-none focus:border-black"
                                    onChange={(e) =>
                                        setRepositoryName(e.target.value)
                                    }
                                />
                                <label
                                    htmlFor="repository_name"
                                    className="font-poppins font-medium text-xs text-ocGray"
                                >
                                    Repository Name
                                </label>
                            </div>
                            <div className="flex flex-col items-start">
                                {repositoryOwnerError && (
                                    <p className="text-xs font-poppins font-medium text-error mb-4">
                                        {repositoryOwnerError}
                                    </p>
                                )}
                                <input
                                    type="text"
                                    id="repository_owner"
                                    placeholder="Facebook"
                                    className="border border-ocGray rounded-md px-3 py-2 text-xs w-full outline-none focus:border-black"
                                    onChange={(e) =>
                                        setRepositoryOwner(e.target.value)
                                    }
                                />
                                <label
                                    htmlFor="repository_owner"
                                    className="font-poppins font-medium text-xs text-ocGray"
                                >
                                    Repository Owner
                                </label>
                            </div>
                            <div
                                id="actions"
                                className="flex items-center gap-4 mt-4"
                            >
                                <Button style="button" color="#E35858">
                                    Cancel
                                </Button>
                                <Button
                                    style="button"
                                    color="#2A2828"
                                    type="submit"
                                >
                                    {submittingProject ? (
                                        <div className="animate-spin">
                                            <AiOutlineLoading3Quarters
                                                size={18}
                                            />
                                        </div>
                                    ) : (
                                        'Add'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </article>
                </div>
            )}
        </section>
    );
}
