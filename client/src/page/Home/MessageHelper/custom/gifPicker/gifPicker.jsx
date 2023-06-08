import React from "react";
import GifPicker from "gif-picker-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import CustomTheme from "../../../../../theme/index";
import config from "./config";
export default function GifPickerComponent({ setSelectedGif }) {
  const { tenorApiKey } = config;
  const handleGifSelect = (gif) => {
    setSelectedGif(gif);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <FontAwesomeIcon icon={faFilm} className="iconIds2" />
      </PopoverTrigger>
      <PopoverContent
        width="380px"
        bg={CustomTheme.colors.brand.background_grey_dark}
        borderColor="gray.600"
      >
        <PopoverBody>
          <div>
            <GifPicker
              tenorApiKey={tenorApiKey}
              theme={"dark"}
              onGifClick={handleGifSelect}
            />
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
