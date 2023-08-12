import React from "react";
import { Routes, Route } from "react-router-dom";
import MarketPage from "../pages/market/Market";
import BuildsPage from "../pages/builds/Explore";
import ItemDetails from "../pages/items/ItemDetails";
import Loading from "../../components/common/Loading";
import useAppRoutes from "./useAppRoutes";
import ItemOrders from "../pages/items/ItemOrders";
import ItemStatistics from "../pages/items/ItemStatistics";
import MyProfile from "../pages/profile/MyProfile";
import MyProfileOrders from "../pages/profile/MyProfileOrders";
import MyProfileStatistics from "../pages/profile/MyProfileStatistics";
import MyProfileReviews from "../pages/profile/MyProfileReviews";

const AppRoutes = () => {
  const { isLoading } = useAppRoutes();

  return (
    <>
      {isLoading ? (
        <Loading.LoadingIndicator />
      ) : (
        <Routes>
          <Route path="/" element={<MarketPage />} />
          <Route path="/builds" element={<BuildsPage />} />
          <Route path="/items/:itemSlug" element={<ItemDetails />}>
            <Route index element={<ItemOrders />} />
            <Route path="statistics" element={<ItemStatistics />} />
          </Route>
          <Route path="/profile/:userName" element={<MyProfile />}>
            <Route index element={<MyProfileOrders />} />
            <Route path="statistics" element={<MyProfileStatistics />} />
            <Route path="reviews" element={<MyProfileReviews />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
