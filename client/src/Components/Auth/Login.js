import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import React, { useState } from "react";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function changeShowHandler() {
    setShow(!show);
  }

  async function submitLoginHandler() {
    setLoading(true);
    if (!userData.email || !userData.password) {
      toast({
        title: "Please fill all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { email, password } = userData;
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
    }
  }

  function getUserCredentialsHandler() {
    setUserData({
      email: "guest@guest.com",
      password: "qwerty123",
    });
  }

  return (
    <>
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel color="gray.300">E-mail</FormLabel>
          <Input
            value={userData.email}
            placeholder="Enter your email"
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel color="gray.300">Password</FormLabel>
          <InputGroup>
            <Input
              value={userData.password}
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={changeShowHandler}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme={"blue"}
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitLoginHandler}
          isLoading={loading}
        >
          Login
        </Button>

        <Button
          colorScheme={"green"}
          width="100%"
          style={{ marginTop: 15 }}
          onClick={getUserCredentialsHandler}
        >
          Demo Credentials (Guest)
        </Button>
      </VStack>
    </>
  );
}

export default Login;
