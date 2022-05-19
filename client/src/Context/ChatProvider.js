import { createContext, useContext, useMemo, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "USER": {
      return { ...state, user: action.value };
    }
    case "SELECTED_CHAT": {
      return { ...state, selectedChat: action.value };
    }
    case "CHATS": {
      return { ...state, chats: action.value };
    }
    case "NOTIFICATION": {
      return { ...state, notification: action.value };
    }
    case "BG_COLOR": {
      return { ...state, bgColor: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const initialState = {
    user: null,
    selectedChat: null,
    chats: [],
    notification: [],
    bgColor: "blue.500",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state, dispatch]);

  return (
    <ChatContext.Provider
      value={value}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat should be used inside the ChatProvider.");
  }

  return context;
};

export default ChatProvider;
