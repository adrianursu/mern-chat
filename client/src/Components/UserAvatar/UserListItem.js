import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import { useChat } from "../../Context/ChatProvider";
import BlurredBox from "../Theme/BlurredBox";

function UserListItem({ user, handleFunction }) {
  const [state] = useChat();
  const { bgColor } = state;

  return (
    <BlurredBox
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: bgColor,
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.avatar}
      />
      <Box>
        <Text color={"gray.300"}>{user.name}</Text>
        <Text color={"gray.300"} fontSize="xs">
          <b>Email: </b>
          {user.email}
        </Text>
      </Box>
    </BlurredBox>
  );
}

export default UserListItem;
