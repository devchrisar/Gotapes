import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Spacer,
  Box,
  Stack,
  CircularProgress,
  CircularProgressLabel,
  Divider,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { addApeepsApi } from "../../../api/apeeps";
import toast from "react-hot-toast";
import AutoResizeTextarea from "../../../page/Home/MessageHelper/custom/AutoResizeTextArea/AutoResizeTextArea";
import EmojiPicker from "../../../page/Home/MessageHelper/custom/emojiPicker/emojiPicker";
import GifPicker from "../../../page/Home/MessageHelper/custom/gifPicker/gifPicker";
import "./apeepsModal.scss";

export default function ApeepsModal({ showModal, setShowModal }) {
  const onClose = () => setShowModal(false);
  const [message, setMessage] = useState("");
  const [selectedGif, setSelectedGif] = useState(null);
  const gifUrl = selectedGif?.url || "";
  const completeMessage = message;
  const iconIds = ["image", "face", "film", "poll"];

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const CharacterCount = message.length;
  const maxCharacterCount = 700;
  const isExceedingLimit = CharacterCount > maxCharacterCount;
  const color = isExceedingLimit ? "red" : "#0078d4";

  const handleBtnDisabled = () => {
    if (isExceedingLimit || CharacterCount === 0) {
      return true;
    }
    return null;
  };

  const handleKeyDown = (event) => {
    if (
      (event.key === "Delete" ||
        event.key === "Backspace" ||
        event.code === "Delete" ||
        event.code === "Backspace") &&
      message === "" &&
      selectedGif
    ) {
      setSelectedGif(null);
    }
  };

  const handleTextareaFocus = (event) => {
    const cursorPosition = event.target.selectionStart;
    setSelectedGif((prevSelectedGif) => ({
      ...prevSelectedGif,
      cursorPosition,
    }));
  };

  const handleSend = async () => {
    try {
      await addApeepsApi(completeMessage, gifUrl).then((response) => {
        if (response?.code >= 200 && response?.code < 300) {
          toast.success(response.message, {
            className: "toast__container",
          });
          onClose();
        }
      });
    } catch (error) {
      toast.error("internal server error", {
        className: "toast__container",
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={onClose}
      size="lg"
      pb="none"
      className="apeepsModal"
    >
      <ModalOverlay />
      <ModalContent borderRadius="25px" height="auto">
        <ModalCloseButton />
        <ModalBody>
          <Box>
            {selectedGif?.url && (
              <>
                <img
                  src={gifUrl}
                  alt={selectedGif.description || "gif"}
                  style={{
                    top: 0,
                    left: 0,
                    width: "100px",
                    height: "100px",
                  }}
                />
                <Divider borderColor="rgba(29, 261, 241, 0.1)" width="100%" />
              </>
            )}
            <AutoResizeTextarea
              minRows={2}
              maxRows={4}
              fontSize="xl"
              fontWeight="500"
              variant="unstyled"
              overflowY="auto"
              resize="none"
              placeholder="¿what's on your mind?"
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              onFocus={handleTextareaFocus}
            />
            <Divider borderColor="gray.700" width="100%" />
          </Box>
          <Stack direction="row" alignItems="center" spacing={4} pt={2}>
            <Stack
              direction="row"
              color="brand.primary"
              className="basic_layout__content__icons"
              fontSize="20px"
              spacing={2}
            >
              <FontAwesomeIcon
                icon={faImage}
                data-tip=""
                data-for={iconIds[0]}
                className="iconIds0"
              />
              <EmojiPicker
                data-tip=""
                data-for={iconIds[1]}
                onSelect={handleEmojiSelect}
              />
              <GifPicker
                data-tip=""
                data-for={iconIds[2]}
                selectedGif={selectedGif}
                setSelectedGif={setSelectedGif}
              />
              <FontAwesomeIcon
                icon={faSquarePollVertical}
                data-tip=""
                data-for={iconIds[3]}
                className="iconIds3"
              />
            </Stack>
            <Spacer />
            <CircularProgress
              size={8}
              trackColor="whiteAlpha.300"
              color={color}
              value={CharacterCount}
              max={700}
            >
              {isExceedingLimit && (
                <CircularProgressLabel fontSize="11px" color="red">
                  &ndash;{CharacterCount - 700}
                </CircularProgressLabel>
              )}
            </CircularProgress>
            <Button
              isDisabled={handleBtnDisabled()}
              onClick={onSubmit}
              type="submit"
              mt={4}
              colorScheme="blue"
              height="40px"
              fontWeight="bold"
              fontSize="18px"
              marginTop="10px"
            >
              Apeeps
            </Button>
          </Stack>
          <Tooltip
            place="bottom"
            effect="solid"
            anchorSelect=".iconIds0"
            id="menu-tooltip"
          >
            <span>Image</span>
          </Tooltip>
          <Tooltip
            place="bottom"
            effect="solid"
            anchorSelect=".iconIds1"
            id="menu-tooltip"
          >
            <span>Emoji</span>
          </Tooltip>
          <Tooltip
            place="bottom"
            effect="solid"
            anchorSelect=".iconIds2"
            id="menu-tooltip"
          >
            <span>Gif</span>
          </Tooltip>
          <Tooltip
            place="bottom"
            effect="solid"
            anchorSelect=".iconIds3"
            id="menu-tooltip"
          >
            <span>Poll</span>
          </Tooltip>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
