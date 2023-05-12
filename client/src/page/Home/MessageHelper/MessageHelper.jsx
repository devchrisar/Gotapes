import React from "react";
import {
  Stack,
  Text,
  StackDivider,
  Image,
  Textarea,
  Button,
  CircularProgress,
  Divider,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandSparkles,
  faImage,
  faFaceGrinSquint,
  faFilm,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";

export default function MessageHelper() {
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
        <Stack direction="row" paddingX={4} paddingY={2} spacing={4}>
          <Image
            src="https://bit.ly/sage-adebayo"
            borderRadius="50%"
            width={12}
            height={12}
          />

          <Stack divider={<StackDivider borderColor="gray.700" />} width="100%">
            <Textarea
              fontSize="xl"
              fontWeight="500"
              variant="unstyled"
              placeholder="¿what's on your mind?"
            ></Textarea>
            <Stack direction="row" justifyContent="space-between">
              <Stack
                direction="row"
                color="brand.primary"
                className="basic_layout__content__icons"
              >
                <FontAwesomeIcon icon={faImage} />
                <FontAwesomeIcon icon={faFaceGrinSquint} />
                <FontAwesomeIcon icon={faFilm} />
                <FontAwesomeIcon icon={faSquarePollVertical} />
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
      </Stack>
      <Divider
        borderBottomWidth={7}
        borderTopWidth={7}
        borderColor="gray.700"
      />
    </>
  );
}
