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
        w="100%"
        p="5px 10px 5px 10px"
        border="5px solid rgba(255, 255, 255, 0.125)"
        backdropFilter="blur(16px) saturate(180%)"
        bg="rgba(17, 25, 40, 0.37)"
      >
        <Tooltip label="Open Control Panel" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            _hover={{ bgColor: "inherit" }}
          >
            <SettingsIcon color="gray.300" />
            <Text
              d={{ base: "none", md: "flex" }}
              px="4"
              fontFamily="Inconsolata"
              color="gray.300"
            >
              {user.isAdmin ? "Admin Panel" : "Control Panel"}
            </Text>
          </Button>
        </Tooltip>

        <Text
          fontSize="2xl"
          fontFamily="Inconsolata"
          fontWeight="bold"
          color="gray.200"
        >
          myChat
        </Text>

        <div>
          <Menu>
            <MenuButton p="1">
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" margin="1" color="gray.300" />
            </MenuButton>
            <MenuList
              bg="rgba(17, 25, 40, 0.77)"
              backdropFilter="blur(16px) saturate(180%)"
              border="1px solid rgba(255, 255, 255, 0.125)"
              color="white"
            >
              {!notification.length && (
                <Box d="flex" justifyContent="center">
                  0 Notifications
                </Box>
              )}

              {notification.map((n) => (
                <MenuItem
                  _hover={{ bgColor: bgColor }}
                  _active={{ bgColor: bgColor }}
                  _focus={{ bgColor: bgColor }}
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
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bgColor={bgColor}
              _hover={{ bgColor: bgColor }}
              _active={{ bgColor: bgColor }}
              color="white"
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.avatar}
                mr="12px"
              />
              <span
                style={{
                  display: "inline-flex",
                  marginTop: "5px",
                }}
              >
                {user.name}
              </span>
            </MenuButton>
            <MenuList
              bg="rgba(17, 25, 40, 0.77)"
              backdropFilter="blur(16px) saturate(180%)"
              border="1px solid rgba(255, 255, 255, 0.125)"
            >
              <ProfileModal user={user}>
                <MenuItem
                  color="white"
                  _hover={{ bgColor: bgColor }}
                  _active={{ bgColor: bgColor }}
                  _focus={{ bgColor: bgColor }}
                >
                  My Profile
                </MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem
                onClick={logoutHandler}
                color="white"
                _hover={{ bgColor: bgColor }}
                _focus={{ bgColor: bgColor }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          bg="rgba(17, 25, 40, 0.7)"
          border="1px solid rgba(255, 255, 255, 0.125)"
          backdropFilter="blur(16px) saturate(180%)"
        >
          <DrawerHeader
            borderBottom="1px"
            fontFamily="Inconsolata"
            color="white"
          >
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
