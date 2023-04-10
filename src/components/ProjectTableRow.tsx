import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { IoReloadOutline } from 'react-icons/io5';
import { GetRepository } from '@/octokit/functions';
import { ref, remove, set } from 'firebase/database';
import database from '@/firebase/rt_database/init';
import { useRouter } from 'next/router';
import GetCurrentDate from '@/helpers/GetCurrentDate';

interface ProjectTableRowProps {
    name: string;
    owner: string;
    upload_date: string;
    index: number;
}

export default function ProjectTableRow({
    name,
    owner,
    upload_date,
    index,
}: ProjectTableRowProps) {
    const router = useRouter();
    const [openActionMenu, setOpenActionMenu] = useState<boolean>(false);

    async function ReloadRepo() {
        await GetRepository(owner, name).then(async ({ data, error }) => {
            if (error) {
                console.log(`${error.status} - ${error.message}`);
            }

            if (data) {
                const date = GetCurrentDate();
                await set(ref(database, `/projects/${name}`), {
                    ...data,
                    lase_updated: date,
                })
                    .then(() => {
                        router.reload();
                    })
                    .catch((error) => {
                        console.log(`${error.code} - ${error.message}`);
                    });
            }
        });
    }

    async function DeleteRepo() {
        await remove(ref(database, `/projects/${name}`))
            .then(() => {
                router.reload();
            })
            .catch((error) => {
                console.log(`${error.code} - ${error.message}`);
            });
    }

    return (
        <tr
            className={`grid grid-cols-12 ${
                index % 2 === 0 ? 'bg-blue-200' : 'bg-transparent'
            }`}
        >
            <td className="col-span-4 px-2 py-2 border border-gray-200 overflow-x-scroll">
                {name}
            </td>
            <td className="col-span-4 px-2 py-2 border border-gray-200">
                {owner}
            </td>
            <td className="col-span-2 px-2 py-2 border border-gray-200 overflow-x-scroll">
                {upload_date}
            </td>
            <td className="relative col-span-2 px-2 py-2 border border-gray-200 flex items-center justify-end">
                <button onClick={() => setOpenActionMenu(!openActionMenu)}>
                    <BsThreeDots size={22} />
                </button>
                {openActionMenu && (
                    <div className="absolute bottom-0 right-0 translate-y-full border-2 border-slate-300 rounded-md px-5 py-2 flex items-center gap-4 bg-white z-20">
                        <button
                            className="hover:text-blue-500 duration-150"
                            onClick={ReloadRepo}
                        >
                            <IoReloadOutline size={22} />
                        </button>
                        <button
                            className="hover:text-blue-500 duration-150"
                            onClick={DeleteRepo}
                        >
                            <MdDelete size={22} />
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}
