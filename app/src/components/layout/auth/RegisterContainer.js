import React from "react";
import FormElements from "../../common/FormElements";

export default function RegisterContainer({ handlePageChange }) {
  const handleClick = () => {
    handlePageChange("login");
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <>
        <div className="text-center my-6">
          <h1 className="text-3xl font-semibold text-gray-700">Sign up</h1>
          <p className="text-sm text-center text-gray-400 mt-1">
            Existing user?&nbsp;
            <FormElements.ButtonForm
              divParentActive={false}
              classButton="font-semibold text-indigo-500 link-button"
              classButtonFocus="focus:text-indigo-600 focus:outline-none focus:underline"
              onClickButton={handleClick}
            >
              Sign In
            </FormElements.ButtonForm>
          </p>
        </div>
        <div className="m-6">
          <form className="mb-4">
            <div>
              <FormElements.InputForm
                label="Ninja Name"
                id="signupNinjaName"
                type="text"
                placeholder="Ninja Name"
                classChildren="mb-6"
                classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                classInputFocus="focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                classInputPlaceholder="placeholder:italic placeholder-gray-300"
                classLabel="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              ></FormElements.InputForm>
            </div>
            <div>
              <FormElements.InputForm
                label="Email Address"
                id="signupEmail"
                type="email"
                placeholder="Email Address"
                classChildren="mb-6"
                classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                classInputFocus="focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                classInputPlaceholder="placeholder:italic placeholder-gray-300"
                classLabel="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              ></FormElements.InputForm>
            </div>
            <div>
              <FormElements.InputForm
                label="Password"
                id="signupPassword"
                type="Password"
                placeholder="Password"
                classChildren="mb-6"
                classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                classInputFocus="focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                classInputPlaceholder="placeholder:italic placeholder-gray-300"
                classLabel="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              ></FormElements.InputForm>
            </div>
            <div>
              <FormElements.InputForm
                label="Confirm Password"
                id="signupConfirmPassword"
                type="Password"
                placeholder="Password"
                classChildren="mb-6"
                classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                classInputFocus="focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                classInputPlaceholder="placeholder:italic placeholder-gray-300"
                classLabel="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              ></FormElements.InputForm>
            </div>
            <div>
              <FormElements.ButtonForm
                classButton="w-full px-3 py-4 text-white bg-indigo-500 rounded-md"
                classButtonHover="hover:bg-indigo-600"
                classButtonFocus="focus:outline-none"
                classButtonAnimation="duration-100 ease-in-out"
                type="button"
              >
                Join now
              </FormElements.ButtonForm>
            </div>
          </form>
        </div>
      </>
    </div>
  );
}
