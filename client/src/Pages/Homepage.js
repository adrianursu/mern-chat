import React, { useEffect } from "react";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import BlurredBox from "../Components/Auth/Theme/BlurredBox";

import {
  Container,
  TabList,
  Tabs,
  Text,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useChat } from "../Context/ChatProvider";

function Homepage() {
  const history = useHistory();
  const [, dispatch] = useChat();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    dispatch({ type: "USER", value: user });

    console.log(user);

    if (user) {
      history.push("/chats");
    }
  }, [dispatch, history]);

  return (
    <Container maxW="xl" centerContent>
      <BlurredBox
        d="flex"
        justifyContent="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
      >
        <Text fontSize="4xl" fontFamily="Inconsolata" color="white">
          Bachelor App
        </Text>
      </BlurredBox>
      <BlurredBox w="100%" p={4}>
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%" color="gray.300">
              Login
            </Tab>
            <Tab width="50%" color="gray.300">
              Register
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </BlurredBox>
    </Container>
  );
}

export default Homepage;
