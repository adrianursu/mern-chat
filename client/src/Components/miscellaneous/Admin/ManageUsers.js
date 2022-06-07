import {
  Box,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Input,
  useToast,
  Spinner,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import { useState } from "react";
import { useChat } from "../../../Context/ChatProvider";
import UserListItem from "../../UserAvatar/UserListItem";
import axios from "axios";
import ChatLoading from "../../ChatLoading";
import AdminProfileModal from "./AdminProfileModal";

function ManageUsers() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [state, dispatch] = useChat();
  const { user } = state;

  const toast = useToast();

  async function deleteHandler() {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // await axios.delete(`/api/user/delete/${}`, config); TO DO

      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to delete user",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });

      setLoading(false);
    }
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
  return (
    <Box d="flex" pb={2}>
      <Popover variant="picker">
        <PopoverTrigger>
          <Button
            aria-label="red.500"
            background="red.500"
            width="100%"
            color="gray.200"
            padding={0}
            minWidth="unset"
            borderRadius={3}
            _hover={{ background: "red.500" }}
            fontFamily="Inconsolata"
          >
            Delete from db/Make Admin
          </Button>
        </PopoverTrigger>
        <PopoverContent
          width="100%"
          bg="rgba(17, 25, 40, 1)"
          border="1px solid rgba(255, 255, 255, 0.125)"
          backdropFilter="blur(16px) saturate(180%)"
        >
          <PopoverArrow bg="red.500" />
          <PopoverCloseButton color="white" />
          <PopoverHeader
            height="35px"
            backgroundColor="red.500"
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            color="white"
          ></PopoverHeader>
          <PopoverBody>
            {" "}
            <Box d="flex" pb="2">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="gray.500" />}
                />
                <Input
                  placeholder="Search by name or email"
                  textColor="white"
                  mr="2"
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
                <AdminProfileModal user={user} deleteHandler={deleteHandler}>
                  <UserListItem key={user._id} user={user} />
                </AdminProfileModal>
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default ManageUsers;
