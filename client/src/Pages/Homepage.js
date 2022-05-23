import React, { useEffect } from "react";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";

import {
  Box,
  Container,
  TabList,
  Tabs,
  Text,
  Tab,
  TabPanels,
  TabPanel
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.37)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)"
        }}
      >
        <Text fontSize="4xl" fontFamily="Inconsolata" color="white">
          Bachelor App
        </Text>
      </Box>
      <Box
        bg="rgba(17, 25, 40, 0.37)"
        w="100%"
        p={4}
        borderRadius="12px"
        border="1px solid rgba(255, 255, 255, 0.125)"
        backdropFilter="blur(16px) saturate(180%)"
        WebkitBackdropFilter="blur(16px) saturate(180%)"
      >
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
      </Box>
    </Container>
  );
}

export default Homepage;
