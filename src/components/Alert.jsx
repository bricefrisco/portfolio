import { XCircleIcon } from "@heroicons/react/20/solid";

const Alert = ({ children }) => {
  return (
    <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
      <div className="flex">
        <div className="shrink-0">
          <XCircleIcon
            aria-hidden="true"
            className="size-5 text-red-400 dark:text-red-300"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            {children}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Alert;
