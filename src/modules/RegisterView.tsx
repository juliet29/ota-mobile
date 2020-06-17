import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { AuthNavProps } from "../navigation/auth/AuthParamList";
import { Mutation } from "react-apollo";
import { Wrapper } from "../global-ui/ReusedUI";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import {
  LoginComponent,
  RegisterComponent,
} from "../generated/apolloComponents";

interface RegisterViewProps {}

const LOGIN = gql`
  type Mutation {
    register(data: RegisterInput!): User!
    login(password: String!, email: String!): User
  }
`;

export const RegisterView: React.FC<AuthNavProps<"Register">> = ({
  navigation,
  route,
}) => {
  // if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error</Text>;

  // const [login2] = useMutation(LOGIN);
  console.log("expo");

  return (
    <Wrapper>
      <RegisterComponent>
        {(register) => (
          <Button
            onPress={async () => {
              const response = await register({
                variables: {
                  data: {
                    password: "hi",
                    username: "newUser",
                    email: "hh@ghh.com",
                  },
                },
              });
              if (response && response.data) {
                console.log("it worked");
              }
              console.log("did it work?");
              console.log(response);
            }}>
            <Text>call login mutation</Text>
          </Button>
        )}
      </RegisterComponent>
    </Wrapper>

    // <Wrapper>

    //   <Button
    //     onPress={() =>
    //       login2({
    //         variables: { email: "mail20@mail.com", password: "hey" },
    //       })
    //     }>
    //     Test Me
    //   </Button>
    //   {/* <Text>{data.username}</Text> */}
    //   <StyledColumnView>
    //     <TextInput label="Username" mode="outlined" />
    //     <TextInput label="Email" mode="outlined" />
    //     <TextInput label="Password" mode="outlined" />
    //     <TextInput label="Re-enter Password" mode="outlined" />
    //     <LineBreak />
    //     <Button
    //       mode="contained"
    //       onPress={() => {
    //         navigation.navigate("Login");
    //         //login({ variables: { email: "mail20@mail.com", password: "hey" } })
    //       }}>
    //       SIGN UP
    //     </Button>
    //   </StyledColumnView>
    // </Wrapper>
  );
};
