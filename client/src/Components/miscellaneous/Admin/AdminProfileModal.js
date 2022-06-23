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
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import axios from "axios";

function ProfileModal({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  function makeAdminHandler(_id) {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios.put(
        "http://localhost:3000/api/user/makeAdmin",
        { _id: _id },
        config
      );

      toast({
        title: "Success!",
        description: "User's role has been modified successfuly",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to update user's role",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });

      setLoading(false);
    }
  }

  function renameHandler(_id) {
    const newName = userName;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios.put(
        "http://localhost:3000/api/user/update",
        {
          newName: newName,
          _id: _id,
        },
        config
      );

      toast({
        title: "Success!",
        description: "User's name has been successfuly updated",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to update user's name",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });

      setLoading(false);
    }
  }

  function deleteHandler(_id) {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axios.delete(`http://localhost:3000/api/user/delete/${_id}`, config);

      toast({
        title: "Success!",
        description: "User has been deleted successfuly!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
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
                isLoading={loading}
                onClick={() => {
                  renameHandler(user._id);
                }}
              >
                Update
              </Button>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="telegram"
              onClick={() => {
                makeAdminHandler(user._id);
              }}
            >
              Make admin
            </Button>
            <Box pr={2} pl={2}>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteHandler(user._id);
                }}
              >
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
