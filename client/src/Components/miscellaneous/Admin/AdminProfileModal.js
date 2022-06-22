import React, { useState } from "react";
import {
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  Box,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import axios from "axios";

function ProfileModal({ user, children, deleteHandler }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUserName] = useState();
  const [renameLoading, setRenameLoading] = useState(false);

  function handleRename(_id) {
    const newName = userName;

    axios.put("http://localhost:3000/api/user/update", {
      newName: newName,
      _id: _id,
    });
  }
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          h="410px"
          bg="rgba(17, 25, 40, 0.37)"
          borderRadius="12px"
          border="1px solid rgba(255, 255, 255, 0.125)"
          backdropFilter="blur(16px) saturate(180%)"
          color="white"
        >
          <ModalHeader
            fontSize="40px"
            fontFamily="Inconsolata"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.avatar}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Inconsolata"
            >
              Email: {user.email}
            </Text>
            <FormControl d="flex">
              <Input
                placeHolder="Change user's name"
                onChange={(e) => setUserName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={() => {
                  handleRename(user._id);
                }}
              >
                Update
              </Button>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="telegram">Make admin</Button>
            <Box pr={2} pl={2}>
              <Button colorScheme="red" onClick={deleteHandler}>
                Delete
              </Button>
            </Box>
            <Button onClick={onClose} color="black">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
