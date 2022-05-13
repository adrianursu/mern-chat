import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import UserListItem from "./UserAvatar/UserListItem";

function MyChats({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [tabIndex, setTabIndex] = useState(0);

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  function handleTabsChange(index) {
    setTabIndex(index);
  }

  async function handleSearch(query) {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });

      setLoading(false);
    }
  }

  async function accessChat(userId) {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setLoadingChat(false);
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });

      setLoadingChat(false);
    }
    handleTabsChange(0);
    setSearch("");
  }

  async function fetchChats() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Tabs
        variant="enclosed"
        isFitted
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList mb="1em">
          <Tab width="50%">Chats</Tab>
          <Tab width="50%">Search</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              pb={3}
              px={3}
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Inconsolata"
              d="flex"
              w="100%"
              flexDir="column"
            >
              <GroupChatModal>
                <Button
                  d="flex"
                  w="100%"
                  fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                  rightIcon={<AddIcon />}
                >
                  New Group Chat
                </Button>
              </GroupChatModal>
            </Box>
            <Box
              d="flex"
              flexDir="column"
              p={3}
              bg="#F8F8F8"
              w="100%"
              h="100%"
              borderRadius="lg"
              overflowY="hidden"
            >
              {chats ? (
                <Stack overflowY="scroll">
                  {chats.map((chat) => (
                    <Box
                      onClick={() => {
                        setSelectedChat(chat);
                      }}
                      cursor="pointer"
                      bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                      color={selectedChat === chat ? "white" : "black"}
                      px={3}
                      py={3}
                      borderRadius="lg"
                      key={chat._id}
                    >
                      <Text>
                        {!chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName}
                      </Text>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <ChatLoading />
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box d="flex" pb="2">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon />}
                />
                <Input
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </InputGroup>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner m="auto" d="flex" />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default MyChats;
