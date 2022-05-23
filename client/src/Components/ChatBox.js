import React from "react";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
import { useChat } from "../Context/ChatProvider";

function ChatBox({ fetchAgain, setFetchAgain }) {
  const [state] = useChat();
  const { selectedChat } = state;
  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}

export default ChatBox;
