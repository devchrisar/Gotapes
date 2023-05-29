import React, { useEffect, useState } from "react";
import {
  Stack,
  Text,
  StackDivider,
  Image,
  Textarea,
  Button,
  CircularProgress,
  Divider,
  Skeleton,
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
import useAuth from "../../../hooks/useAuth";
import Placeholder from "/assets/svg/placeholder.svg";
import { getUserApi } from "../../../api/user";
import EmojiPicker from "./custom/emojiPicker/emojiPicker";
import GifPicker from "./custom/gifPicker/gifPicker";

export default function MessageHelper() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const currentUser = useAuth();
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
              />
            </Skeleton>
            <Stack
              divider={<StackDivider borderColor="gray.700" />}
              width="100%"
            >
              <Textarea
                fontSize="xl"
                fontWeight="500"
                variant="unstyled"
                placeholder="¿what's on your mind?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Textarea>
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
                  <GifPicker data-tip="" data-for={iconIds[2]} />
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
                    size={6}
                    trackColor="whiteAlpha.300"
                    value={20}
                  />
                  <Button className="btn btn-primary">Apeeps</Button>
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
