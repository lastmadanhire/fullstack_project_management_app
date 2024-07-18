import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({auth,projects,queryParams=null}){
  queryParams=queryParams || {}

  const searchFieldChanged=(name, value)=>{
    if (value) {
      queryParams[name]=value;
    }else{
      delete queryParams[name];
    }
    router.get(route('project.index'),queryParams)
    console.log(projects);

  }
  const onKeyPress=(name, e)=>{
    if (e.key!== 'Enter') {
      return
    }else{
      searchFieldChanged(name,e.target.value)
    }

  }
  return(
    <AuthenticatedLayout
    user={auth.user}
    header={
      <h2 className="font-semibold text-xl text-gray-800
      dark:text-gray-200 leading-tight">
        Projects
      </h2>
    }
    >
    <Head title="Projects" />
    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <table className="w-full text-sm text-center">
                    <thead>
                     <tr className="text-nowrap">
                      <th className="px-3 py-2">#</th>
                      <th className="px-3 py-2">Image</th>
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Created Date</th>
                      <th className="px-3 py-2">Due date</th>
                      <th className="px-3 py-2">Created By</th>
                      <th className="px-3 py-2">Actions</th>
                     </tr>
                     <tr className="text-nowrap">
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <TextInput className="w-full"
                        defaultValue={queryParams.name}
                        onBlur={(e)=>searchFieldChanged('name',e.target.value)}
                        onKeyPress={(e)=>onKeyPress('name',e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <SelectInput className="w-full"
                        defaultValue={queryParams.status}
                        onChange={(e)=>searchFieldChanged('status',e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                     </tr>
                    </thead>
                    <tbody>
                      {projects.data.map((project)=>(
                        <tr key={project.id}>
                          <th className="px-3 py-3">{project.id}</th>
                          <td className="px-3 py-3">
                            <img src={project.image_path} />
                          </td>
                          <th className="px-3 py-3 txt-white text-nowrap hover:text-blue-400">
                            <Link href={route("project.show",project.id)}>
                            {project.name}
                            </Link>
                            </th>
                          <td className="px-2 py-2">
                            <span className={"px-3 py-2 text-white rounded "+PROJECT_STATUS_CLASS_MAP[project.status]}>
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                            </span>
                          </td>
                          <td className="px-3 py-3">{project.created_at}</td>
                          <td className="px-3 py-3">{project.due_date}</td>
                          <td className="px-3 py-3">{project.createdBy.name}</td>
                          <td className="px-3 py-3">
                            <Link href={route('project.edit',project.id)}
                            className="text-blue-500 font-medium hover:underline mx-1"
                            >Edit</Link>
                            <Link href={route('project.destroy',project.id)}
                            className="text-red-500 font-medium hover:underline mx-1"
                            >Delete</Link>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                  <Pagination links={projects.meta.links}/>
                </div>
            </div>
        </div>
    </div>

    </AuthenticatedLayout>
  )
}
