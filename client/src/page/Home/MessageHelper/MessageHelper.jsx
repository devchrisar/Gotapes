import React, { useEffect, useState } from "react";
import {
  Stack,
  Text,
  StackDivider,
  Image,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandSparkles,
  faImage,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { addApeepsApi } from "../../../api/apeeps";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import Placeholder from "/assets/svg/placeholder.svg";
import { getUserApi } from "../../../api/user";
import AutoResizeTextarea from "./custom/AutoResizeTextArea/AutoResizeTextArea";
import EmojiPicker from "./custom/emojiPicker/emojiPicker";
import GifPicker from "./custom/gifPicker/gifPicker";

export default function MessageHelper() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedGif, setSelectedGif] = useState(null);
  const currentUser = useAuth();
  const gifUrl = selectedGif?.url || "";
  const completeMessage = message;
  const iconIds = ["image", "face", "film", "poll"];

  useEffect(() => {
    (async () => {
      const response = await getUserApi(currentUser._id);
      setUser(response);
    })();
  }, [currentUser]);

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
    setMessage("");
    setSelectedGif(null);
    try {
      await addApeepsApi(completeMessage, gifUrl).then((response) => {
        if (response?.code >= 200 && response?.code < 300) {
          toast.success(response.message, {
            className: "toast__container",
          });
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
    <>
      <Stack
        divider={<StackDivider borderColor="gray.700" width="100%" />}
        spacing={0}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingX={4}
          paddingY={3}
        >
          <Text fontWeight="bold" fontSize="2xl">
            Inicio
          </Text>
          <FontAwesomeIcon
            icon={faHandSparkles}
            style={{
              color: "#1da0f2",
              width: "1.25rem",
              height: "1.25rem",
            }}
            beat
          />
        </Stack>
        <AnimatePresence>
          <Stack direction="row" paddingX={4} paddingY={2} spacing={4}>
            <Skeleton
              isLoaded={!!user}
              startColor="#192734"
              endColor="#15212b"
              borderRadius="50%"
              width={12}
              height={12}
            >
              <Image
                src={user?.avatar || Placeholder}
                backgroundPosition="center"
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                borderRadius="50%"
                width={12}
                height={12}
                maxW="none"
              />
            </Skeleton>
            <Stack
              divider={<StackDivider borderColor="gray.700" />}
              width="100%"
            >
              <Box>
                {selectedGif?.url && (
                  <>
                    <img
                      src={selectedGif.url}
                      alt={selectedGif.description || "gif"}
                      style={{
                        top: 0,
                        left: 0,
                        width: "100px",
                        height: "100px",
                      }}
                    />
                    <Divider
                      borderColor="rgba(29, 261, 241, 0.1)"
                      width="100%"
                    />
                  </>
                )}
                <AutoResizeTextarea
                  minRows={2}
                  maxRows={10}
                  fontSize="xl"
                  fontWeight="500"
                  variant="unstyled"
                  minHeight="100px"
                  overflowY="auto"
                  resize="none"
                  placeholder="¿what's on your mind?"
                  value={message}
                  onChange={handleMessageChange}
                  onKeyDown={handleKeyDown}
                  onFocus={handleTextareaFocus}
                />
              </Box>
              <Stack direction="row" justifyContent="space-between">
                <Stack
                  direction="row"
                  color="brand.primary"
                  className="basic_layout__content__icons"
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
                <Stack
                  direction="row"
                  divider={<StackDivider borderColor="gray.700" />}
                  alignItems="center"
                  spacing={4}
                >
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
                    type="submit"
                    className="btn btn-primary"
                    isDisabled={handleBtnDisabled()}
                    onClick={onSubmit}
                  >
                    Apeeps
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </AnimatePresence>
      </Stack>
      <Divider
        borderBottomWidth={7}
        borderTopWidth={7}
        borderColor="gray.700"
      />
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
    </>
  );
}
