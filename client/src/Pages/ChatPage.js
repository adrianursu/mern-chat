import React, { useState, useEffect } from "react";
import { useChat } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import Sidebar from "../Components/miscellaneous/Sidebar";
import MyChats from "../Components/MyChats";
import ChatBox from "../Components/ChatBox";
import { useHistory } from "react-router-dom";

function ChatPage() {
  const [state, dispatch] = useChat();
  const { user } = state;
  const [fetchAgain, setFetchAgain] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    dispatch({ type: "USER", value: userInfo });

    if (!userInfo) {
      history.push("/");
    }

  }, [dispatch, history]);

  return (
    user && (
      <div style={{ width: "100%" }}>
        <Sidebar />

        <Box
          d="flex"
          justifyContent="space-between"
          w="100%"
          h="91.5vh"
          p="10px"
        >
          <MyChats fetchAgain={fetchAgain} />
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
      </div>
    )
  );
}

export default ChatPage;
