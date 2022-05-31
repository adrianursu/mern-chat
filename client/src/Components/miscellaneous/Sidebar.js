import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
import NotificationBadge, { Effect } from "react-notification-badge";

import { useChat } from "../../Context/ChatProvider";
import React from "react";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import { getSender } from "../../config/ChatLogics";
import ColorPicker from "./ColorPicker";
import ManageUsers from "./Admin/ManageUsers";

function Sidebar() {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, dispatch] = useChat();
  const { user, notification, bgColor } = state;

  function logoutHandler() {
    localStorage.removeItem("userInfo");
    dispatch({ type: "USER", value: null });
    history.push("/");
  }

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        background={bgColor}
      >
        <Tooltip label="Open Control Panel" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <SettingsIcon />
            <Text
              d={{ base: "none", md: "flex" }}
              px="4"
              fontFamily="Inconsolata"
            >
              {user.isAdmin ? "Admin Panel" : "Control Panel"}
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Inconsolata">
          Mern Chat
        </Text>

        <div>
          <Menu>
            <MenuButton p="1">
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" margin="1" />
            </MenuButton>
            <MenuList>
              {!notification.length && (
                <Box d="flex" justifyContent="center">
                  0 Notifications
                </Box>
              )}

              {notification.map((n) => (
                <MenuItem
                  key={n._id}
                  onClick={() => {
                    dispatch({ type: "SELECTED_CHAT", value: n.chat });
                    dispatch({
                      type: "NOTIFICATION",
                      value: notification.filter((notif) => notif !== n),
                    });
                  }}
                >
                  {n.chat.isGroupChat
                    ? `New Message in ${n.chat.chatName}`
                    : `New Message from ${getSender(user, n.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.avatar}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottom="1px" fontFamily="Inconsolata">
            {user.isAdmin ? "Admin Panel" : "Control Panel"}
          </DrawerHeader>
          <DrawerBody>
            <ColorPicker />
            {user.isAdmin && (
              <>
                <Divider pb="5px" />
                <ManageUsers />
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default Sidebar;
