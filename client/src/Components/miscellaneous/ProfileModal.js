import React from "react";
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
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { useChat } from "../../Context/ChatProvider";

function ProfileModal({ user, children }) {
  const [state] = useChat();
  const { bgColor } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          bgColor={bgColor}
          _hover={{ bgColor: bgColor }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
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
            {user?.name}
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
              src={user?.avatar}
              alt={user?.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Inconsolata"
            >
              Email: {user?.email}
            </Text>
          </ModalBody>
          <ModalFooter>
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
