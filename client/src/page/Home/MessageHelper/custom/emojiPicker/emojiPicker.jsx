import React from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinSquint } from "@fortawesome/free-solid-svg-icons";
import CustomTheme from "../../../../../theme/index";

export default function EmojiPickerComponent({ onSelect }) {
  const handleEmojiSelect = (emoji) => {
    onSelect(emoji.native);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <FontAwesomeIcon icon={faFaceGrinSquint} className="iconIds1" />
      </PopoverTrigger>
      <PopoverContent
        width="380px"
        bg={CustomTheme.colors.brand.background_grey_dark}
        borderColor="gray.600"
      >
        <PopoverBody>
          <Picker
            set="native"
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="dark"
            showPreview={false}
            showSkinTones={false}
            useButton={false}
            autoFocus={true}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
