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
import { useChat } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import UserListItem from "./UserAvatar/UserListItem";
import BlurredBox from "./Theme/BlurredBox";

function MyChats({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [tabIndex, setTabIndex] = useState(0);

  const [state, dispatch] = useChat();
  const { selectedChat, user, chats, bgColor } = state;

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

      const { data } = await axios.get(`/api/user?search=${query}`, config);

      setLoading(false);
      if (data) setSearchResult(data);
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
        dispatch({ type: "CHATS", value: [data, ...chats] });
      }
      dispatch({ type: "SELECTED_CHAT", value: data });
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
      dispatch({ type: "CHATS", value: data });
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

  console.log(chats);

  return (
    <BlurredBox
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      p={3}
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
        <TabList mb="1em" color="gray.300">
          <Tab width="50%" _selected={{ color: "white", fontWeight: "bold" }}>
            Chats
          </Tab>
          <Tab width="50%" _selected={{ color: "white", fontWeight: "bold" }}>
            Search
          </Tab>
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
                  bg="rgba(17, 25, 40, 0.37)"
                  borderRadius="12px"
                  border="1px solid rgba(255, 255, 255, 0.125)"
                  backdropFilter="blur(16px) saturate(180%)"
                  d="flex"
                  w="100%"
                  fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                  rightIcon={<AddIcon />}
                  color="gray.300"
                  _hover={{ bgColor: bgColor, color: "gray.300" }}
                >
                  New Group Chat
                </Button>
              </GroupChatModal>
            </Box>
            <BlurredBox
              d="flex"
              flexDir="column"
              p={3}
              w="100%"
              maxH="70vh"
              borderRadius="lg"
              overflowY="hidden"
            >
              {chats ? (
                <Stack overflowY="scroll">
                  {chats.map(
                    (chat) =>
                      chat.users.length >= 2 && (
                        <Box
                          onClick={() => {
                            dispatch({ type: "SELECTED_CHAT", value: chat });
                          }}
                          cursor="pointer"
                          bg={
                            selectedChat === chat
                              ? bgColor
                              : "rgba(17, 25, 40, 0.37)"
                          }
                          color={selectedChat === chat ? "white" : "gray.400"}
                          px={3}
                          py={3}
                          borderRadius="lg"
                          key={chat._id}
                          _hover={{ bgColor: bgColor, color: "gray.100" }}
                        >
                          <Text>
                            {!chat.isGroupChat
                              ? getSender(loggedUser, chat.users)
                              : chat.chatName}
                          </Text>
                          {chat.latestMessage && (
                            <Text fontSize="xs">
                              <b>{chat.latestMessage.sender.name}: </b>
                              {chat.latestMessage.content.length > 50
                                ? chat.latestMessage.content.substring(0, 51) +
                                  "..."
                                : chat.latestMessage.content}
                            </Text>
                          )}
                        </Box>
                      )
                  )}
                </Stack>
              ) : (
                <ChatLoading />
              )}
            </BlurredBox>
          </TabPanel>
          <TabPanel>
            <Box d="flex" pb="2">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="gray.500" />}
                />
                <Input
                  placeholder="Search by name or email"
                  value={search}
                  focusBorderColor="grey"
                  textColor="white"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </InputGroup>
            </Box>
            <BlurredBox
              d="flex"
              flexDir="column"
              p={3}
              w="100%"
              maxH="70vh"
              borderRadius="lg"
              overflowY="hidden"
            >
              <Stack overflowY="scroll">
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
              </Stack>
            </BlurredBox>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BlurredBox>
  );
}

export default MyChats;
