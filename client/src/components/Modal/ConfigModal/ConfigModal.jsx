import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import LogoWt from "/assets/svg/logo_GotapesWt-png.png";

const ConfigModal = React.memo(
  ({ show, setShow, children }) => {
    const MotionModalOverlay = motion(ModalOverlay);
    const MotionModalContent = motion(ModalContent);

    const handleCloseModal = () => {
      setShow(false);
    };

    return (
      <Modal
        isOpen={show}
        onClose={handleCloseModal}
        isCentered
        size="lg"
        closeOnOverlayClick={false}
      >
        <MotionModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MotionModalContent
            className="config-modal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ModalHeader display="flex" alignItems="center">
              <img src={LogoWt} alt="Logo" />
              <ModalCloseButton onClick={handleCloseModal} ml="auto" />
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </MotionModalContent>
        </MotionModalOverlay>
      </Modal>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.show === nextProps.show;
  }
);
ConfigModal.displayName = "ConfigModal";
export default ConfigModal;
