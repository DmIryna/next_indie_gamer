import { ArrowPathIcon } from "@heroicons/react/24/outline"

function Loading() {
  return (
    <div className="flex justify-center py-6">
      <ArrowPathIcon className="animate-spin h-6 w-6 text-orange-700 " />
    </div>
  )
}

export default Loading
