import Pagination from "@/Components/Pagination";
import { Link, router } from '@inertiajs/react';
import { TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP } from "@/constants.jsx"
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function TaskTable({tasks, queryParams = null, hideProjectColumn = false}) {
    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('task.index'), queryParams)
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if (name === queryParams.field) {
            if (queryParams.direction === 'asc') {
                queryParams.direction = 'desc';
            } else {
                queryParams.direction = 'asc';
            }
        } else {
            queryParams.field = name;
            queryParams.direction = 'asc';
        }
        router.get(route('task.index'), queryParams)
    }

    const deleteTask = (task) => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }

        router.delete(route('task.destroy', task.id))
    }

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading 
                                name="id" 
                                field={queryParams.field} 
                                direction={queryParams.direction}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                            <th className="px-3 py-3">Image</th>
                            {!hideProjectColumn && ( <th className="px-3 py-3">Project Name</th> )}
                            <TableHeading 
                                name="name" 
                                field={queryParams.field} 
                                direction={queryParams.direction}
                                sortChanged={sortChanged}
                            >
                                Name
                            </TableHeading>
                            <TableHeading 
                                name="status" 
                                field={queryParams.field} 
                                direction={queryParams.direction}
                                sortChanged={sortChanged}
                            >
                                Status
                            </TableHeading>
                            <TableHeading 
                                name="created_at" 
                                field={queryParams.field} 
                                direction={queryParams.direction}
                                sortChanged={sortChanged}
                            >
                                Create Date
                            </TableHeading>
                            <TableHeading 
                                name="due_date" 
                                field={queryParams.field} 
                                direction={queryParams.direction}
                                sortChanged={sortChanged}
                            >
                                Due Date
                            </TableHeading>
                            <th className="px-3 py-3">Created By</th>
                            <th className="px-3 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            {!hideProjectColumn && ( <th className="px-3 py-3"></th> )}
                            <th className="px-3 py-3">
                                <TextInput 
                                    className="w-full" 
                                    defaultValue={queryParams.name}
                                    placeholder="Task Name"
                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                    onKeyPress={e => onKeyPress('name', e)}
                                />
                            </th>
                            <th className="px-3 py-3">
                                <SelectInput 
                                    className="w-full"
                                    defaultValue={queryParams.status}
                                    onChange={e => searchFieldChanged('status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map(task => (
                            <tr
                            key={task.id} 
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-3 py-2">{task.id}</th>
                                <td className="px-3 py-2">
                                    <img src={task.image} style={{width:60}} />
                                </td>
                                {!hideProjectColumn && ( <td className="px-3 py-2">{task.project.name}</td> )}
                                <td className="px-3 py-2 text-gray-100 hover:underline">
                                    <Link href={route('task.show', task.id)}>
                                        {task.name}
                                    </Link>
                                </td>
                                <td className="px-3 py-2">
                                    <span className={
                                        "px-2 py-1 rounded text-nowrap text-white " + 
                                        TASK_STATUS_CLASS_MAP[task.status]
                                    }>
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                                <td className="px-3 py-2">{task.createdBy.name}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link href={route('task.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                        Edit
                                    </Link>
                                    <button onClick={(e) => deleteTask(task)}className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links} />
        </>
    )
}