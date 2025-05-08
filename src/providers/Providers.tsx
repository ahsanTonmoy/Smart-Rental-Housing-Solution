"use client";

import UserProvider from "@/context/UserContext";
import StoreProvider from "./StoreProvider";
import { RentalRequestProvider } from "@/context/RentalRequestContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <RentalRequestProvider>
        <StoreProvider>{children}</StoreProvider>
      </RentalRequestProvider>
    </UserProvider>
  );
};

export default Providers;
