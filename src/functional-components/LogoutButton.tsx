import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { useLogoutMutation } from "../generated-components/apolloComponents";
import { Button } from "react-native-paper";
import { setAccessToken } from "../utils/accessToken";
import { useLoginHook } from "./useLoginHook";

interface LogoutButtonProps {}

export const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  const { user, setUser } = useContext(AuthContext);
  const [logoutUser] = useLogoutMutation();
  const [_, setLogoutUser] = useLoginHook();

  return (
    <Button
      mode="text"
      onPress={async () => {
        await logoutUser();
        setLogoutUser();
        console.log(`ive logged out, my ctx is ${user}`);
      }}>
      Logout
    </Button>
  );
};
