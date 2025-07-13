import { CheckCircleIcon } from "@heroicons/react/20/solid";

const AlertSuccess = ({ children }) => {
  return (
    <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
      <div className="flex">
        <div className="shrink-0">
          <CheckCircleIcon
            aria-hidden="true"
            className="size-5 text-green-400 dark:text-green-300"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
            {children}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AlertSuccess;
