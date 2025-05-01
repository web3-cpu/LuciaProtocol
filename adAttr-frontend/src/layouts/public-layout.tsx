import { Outlet } from "react-router-dom";

import "twin.macro";

const PublicLayout = () => {
  return (
    <div tw="min-h-screen h-screen flex flex-col">
      <div tw="grow">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
