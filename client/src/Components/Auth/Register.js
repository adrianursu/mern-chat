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

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useChat } from "../../Context/ChatProvider";

function Register() {
  const [, dispatch] = useChat();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();

  function postDetails(pictures) {
    setLoading(true);
    if (pictures === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    if (pictures.type === "image/jpeg" || pictures.type === "image/png") {
      const info = new FormData();
      info.append("file", pictures);
      info.append("upload_preset", "mern-chat");
      info.append("cloud_name", "adrian1337");
      fetch("https://api.cloudinary.com/v1_1/adrian1337/image/upload", {
        method: "POST",
        body: info,
      })
        .then((res) => res.json())
        .then((info) => {
          setUserData({ ...userData, avatar: info.url.toString() });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
      return;
    }
  }

  async function submitHandler() {
    setLoading(true);
    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      toast({
        title: "Please Fill all the Fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      toast({
        title: "Passwords doesn't match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
      return;
    }
    const { name, email, password, avatar } = userData;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, avatar },
        config
      );

      toast({
        title: "Registration has been successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: "USER", value: data });
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

  const gray = "gray.300";

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel color={gray}>Name</FormLabel>
        <Input
          textColor={gray}
          placeholder="Enter Your Name"
          onChange={(e) => {
            setUserData({ ...userData, name: e.target.value });
          }}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel color={gray}>Email</FormLabel>
        <Input
          textColor={gray}
          placeholder="Enter Your E-mail"
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel color={gray}>Password</FormLabel>
        <InputGroup>
          <Input
            textColor={gray}
            type={show.password ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={(e) => {
                setShow({ ...show, password: !show.password });
              }}
            >
              {show.password ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel color={gray}>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            textColor={gray}
            type={show.confirmPassword ? "text" : "password"}
            placeholder="Confirm Your Password"
            onChange={(e) => {
              setUserData({ ...userData, confirmPassword: e.target.value });
            }}
          />

          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={(e) => {
                setShow({
                  ...show,
                  confirmPassword: !show.confirmPassword,
                });
              }}
            >
              {show.confirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="avatar">
        <FormLabel color={gray}>Upload your Picture</FormLabel>
        <Input
          color={gray}
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        />
      </FormControl>

      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Register
      </Button>
    </VStack>
  );
}

export default Register;
