import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({auth,project}){
  return (
    <AuthenticatedLayout
    user={auth.user}
    header={
      <h2 className="font-semibold text-xl text-gray-800 dark:text-red-400 leading-tight">
        {`Project ${project.name}`}
      </h2>
    }
    >
    <Head title={`Project ${project.name}`}/>

    </AuthenticatedLayout>
  )

}
