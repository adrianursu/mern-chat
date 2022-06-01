import React from "react";
import SingleChat from "./SingleChat";
import { useChat } from "../Context/ChatProvider";
import BlurredBox from "./Theme/BlurredBox";

function ChatBox({ fetchAgain, setFetchAgain }) {
  const [state] = useChat();
  const { selectedChat } = state;
  return (
    <BlurredBox
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </BlurredBox>
  );
}

export default ChatBox;
