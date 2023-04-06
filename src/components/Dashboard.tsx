import { useState } from 'react';
import Button from './Button';
import AddProject from '@/firebase/rt_database/functions/AddProject';

export default function Dashboard() {
    const [projectModalIsOpen, setProjectModalIsOpen] = useState<
        boolean | undefined
    >();

    return (
        <section className="pt-6">
            <div className="flex justify-end mb-8">
                <Button
                    style="button"
                    color="black"
                    onClick={() => AddProject('test')}
                >
                    Add Project
                </Button>
            </div>
            <div>
                <h1 className="font-roboto font-medium text-xl mb-3">
                    Existing Projects
                </h1>
                <table className="w-full">
                    <thead className="text-xs md:text-base">
                        <tr className="grid grid-cols-12">
                            <td className="col-span-4 px-2 py-2 bg-gray-200 border-x border-x-gray-300">
                                Name
                            </td>
                            <td className="col-span-4 px-2 py-2 bg-gray-200 border-x border-x-gray-300">
                                Uploaded Date
                            </td>
                            <td className="col-span-4 px-2 py-2 bg-gray-200 border-x border-x-gray-300">
                                Actions
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </section>
    );
}
