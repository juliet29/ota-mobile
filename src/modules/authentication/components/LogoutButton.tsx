import React from "react";
import { Button } from "react-native-paper";
import { useLogoutMutation } from "../../../generated-components/apolloComponents";
import { useLoginHook } from "./useLoginHook";
import { useStoreState } from "../../../state-management/hooks";

interface LogoutButtonProps {}

export const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  const [logoutUser] = useLogoutMutation();
  const [_, setLogoutUser] = useLoginHook();
  const userState = useStoreState((state) => state.user.user);

  return (
    <Button
      mode="contained"
      style={{ width: "30%", padding: 0 }}
      labelStyle={{ padding: 0, margin: 0 }}
      onPress={async () => {
        await logoutUser();
        setLogoutUser();
        console.log(`ive logged out, my ctx is ${userState}`);
      }}>
      Logout
    </Button>
  );
};
