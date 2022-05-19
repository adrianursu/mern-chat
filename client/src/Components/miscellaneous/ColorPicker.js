import React from "react";
import {
  Box,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Center,
  PopoverBody,
  SimpleGrid,
  Input,
} from "@chakra-ui/react";
import { useChat } from "../../Context/ChatProvider";

const colors = [
  "gray.500",
  "red.500",
  "gray.700",
  "green.500",
  "blue.500",
  "blue.800",
  "yellow.500",
  "orange.500",
  "purple.500",
  "pink.500",
];

function ColorPicker() {
  const [state, dispatch] = useChat();
  const { bgColor } = state;

  return (
    <Box d="flex" pb={2}>
      <Popover variant="picker">
        <PopoverTrigger>
          <Button
            aria-label={bgColor}
            background={bgColor}
            width="100%"
            color="gray.200"
            padding={0}
            minWidth="unset"
            borderRadius={3}
            _hover={{ background: bgColor }}
          >
            Background Color Picker
          </Button>
        </PopoverTrigger>
        <PopoverContent width="170px">
          <PopoverArrow bg={bgColor} />
          <PopoverCloseButton color="white" />
          <PopoverHeader
            height="100px"
            backgroundColor={bgColor}
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            color="white"
          >
            <Center height="100%">{bgColor}</Center>
          </PopoverHeader>
          <PopoverBody height="120px">
            <SimpleGrid columns={5} spacing={2}>
              {colors.map((c) => (
                <Button
                  key={c}
                  aria-label={c}
                  background={c}
                  height="22px"
                  width="22px"
                  padding={0}
                  minWidth="unset"
                  borderRadius={3}
                  _hover={{ background: c }}
                  onClick={() => {
                    dispatch({ type: "BG_COLOR", value: c });
                  }}
                />
              ))}
            </SimpleGrid>
            <Input
              borderRadius={3}
              marginTop={3}
              placeholder="red.100"
              size="sm"
              value={bgColor}
              onChange={(e) => {
                dispatch({ type: "BG_COLOR", value: e.target.value });
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default ColorPicker;
