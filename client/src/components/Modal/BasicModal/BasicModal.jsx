import React from "react";
import "./BasicModal.scss";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import LogoWhite from "/assets/svg/logo_GotapesWt-png.png";

export default function BasicModal(props) {
  const { show, setShow, children } = props;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Modal
        isOpen={show}
        onClose={() => setShow(false)}
        isCentered={true}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Image src={LogoWhite} alt="logo" />
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </motion.div>
  );
}
