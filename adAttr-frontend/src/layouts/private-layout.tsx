import { Outlet } from "react-router-dom";

import usePrivateRoute from "~/hooks/use-private-route";
import PrivateHeader from "~/layouts/private-header";

import Sidebar from "./sidebar";

import "twin.macro";

const PrivateLayout = () => {
  const { isInitialized } = usePrivateRoute();

  if (!isInitialized) return null;

  return (
    <>
      <PrivateHeader />
      <div tw="flex flex-row" className="bg-[#ffffff]">
        <Sidebar />
        <div tw="grow max-w-[calc(100vw-260px)]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
