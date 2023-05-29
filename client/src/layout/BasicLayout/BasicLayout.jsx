import React from "react";
import "./BasicLayout.scss";
import { Container, Stack, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import LeftMenu from "../../components/leftMenu/leftMenu";

export default function BasicLayout(props) {
  const { className, setRefreshCheckLogin, children } = props;

  return (
    <Container
      className={`basic_layout ${className}`}
      alignSelf="center"
      paddingX={4}
      height="100%"
      maxWidth="container.lg"
    >
      <Stack direction="row" height="100%">
        <Box className="basic_layout__menu">
          <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin} />
        </Box>
        <Box className="basic_layout__content" paddingX={0} width="100%">
          <motion.div
            padding={4}
            width="100%"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Stack
              className="scrollable-content"
              borderRightWidth={1}
              borderRightColor="gray.700"
              maxW="580px"
            >
              {children}
            </Stack>
          </motion.div>
        </Box>
      </Stack>
    </Container>
  );
}
