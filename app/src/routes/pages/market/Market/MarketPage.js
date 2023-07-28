import React from "react";
import FormElements from "../../../../components/common/FormElements";
import "../../../../assets/styles/pages/Market/Market/Market.css";
import { useTranslation } from "react-i18next";

function MarketPage() {
  const { t } = useTranslation();
  return (
    <>
      
      <main className="bg-white relative">
        <section className="container-full mx-auto py-4 content-all">
          <div className="content-header w-3/5 mx-auto">
            <div className="flex items-center justify-center">
              <div className="container relative grid grid-cols-1 md:grid-cols-3 gap-4 z-20">
                <div className="col-span-1 flex items-center justify-center">
                  <div className="filterHeader w-full">
                    <header>
                      <h1 className="text-[1.75rem] font-semibold uppercase">
                        Most Recent Orders
                      </h1>
                    </header>
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <div className="filterTypes statusFilter col-span-1 w-full">
                    <>
                      <h5 className="mb-4 color-orange">Online Status</h5>
                      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 sm:flex ">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                          <div className="flex items-center pl-3">
                            <input
                              id="horizontal-list-radio-license"
                              type="radio"
                              defaultValue=""
                              name="list-radio"
                              className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-0 shadow-none"
                            />
                            <label
                              htmlFor="horizontal-list-radio-license"
                              className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                            >
                              Online
                            </label>
                          </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                          <div className="flex items-center pl-3">
                            <input
                              id="horizontal-list-radio-id"
                              type="radio"
                              defaultValue=""
                              name="list-radio"
                              className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-0 shadow-none"
                            />
                            <label
                              htmlFor="horizontal-list-radio-id"
                              className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                            >
                              Ingame
                            </label>
                          </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                          <div className="flex items-center pl-3">
                            <input
                              id="horizontal-list-radio-millitary"
                              type="radio"
                              defaultValue=""
                              name="list-radio"
                              className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-0 shadow-none"
                            />
                            <label
                              htmlFor="horizontal-list-radio-millitary"
                              className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                            >
                              All
                            </label>
                          </div>
                        </li>
                      </ul>
                    </>
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <div className="filterTypes priceFilter col-span-1">
                    <div className="mx-auto">
                      <FormElements.InputForm
                        id="minPrice"
                        name="minPrice"
                        type="number"
                        placeholder="Min price"
                        classChildren="mx-auto"
                        classSubChildren="flex justify-between"
                        classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        validate={false}
                      ></FormElements.InputForm>
                    </div>
                    <div>
                      <FormElements.InputForm
                        id="maxPrice"
                        name="maxPrice"
                        type="number"
                        placeholder="Max price"
                        classChildren="mx-auto"
                        classSubChildren="flex justify-between"
                        classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        validate={false}
                      ></FormElements.InputForm>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default MarketPage;
