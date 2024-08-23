import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function TableHeading({name, sortable = true, field = null, direction = null, sortChanged = () => {}, children}) {
    return (
        <th onClick={e => sortChanged(name)}>
            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                { children }
                {sortable && (
                    <div>
                        <ChevronUpIcon className={
                            "w-4 " + 
                            (field === name && direction === "asc" ? "text-white" : "")
                        } />
                        <ChevronDownIcon className={
                            "w-4 -mt-2 " + 
                            (field === name && direction === "desc" ? "text-white" : "")
                        } />
                    </div>
                )}
            </div>
        </th>
    );
}