import { Box } from "@chakra-ui/react";

function BlurredBox({ children, ...rest }) {
  return (
    <Box
      {...rest}
      bg="rgba(17, 25, 40, 0.37)"
      borderRadius="12px"
      border="1px solid rgba(255, 255, 255, 0.125)"
      backdropFilter="blur(16px) saturate(180%)"
    >
      {children}
    </Box>
  );
}

export default BlurredBox;
