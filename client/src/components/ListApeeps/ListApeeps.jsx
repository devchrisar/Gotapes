import React, { useEffect, useState } from "react";
import {
  Flex,
  Avatar,
  Text,
  Image,
  Divider,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import { getUserApi } from "../../api/user";
import Placeholder from "/assets/svg/placeholder.svg";
import CheckBadge from "/assets/svg/check_badge.svg";
import { API_HOST } from "../../utils/constant";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import {
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized/dist/es/CellMeasurer";
import "./ListApeeps.scss";
import * as luxon from "luxon";

export default function ListApeeps({ apeeps }) {
  const rowRenderer = ({ index, key, parent, style }) => {
    const apeep = apeeps[index];
    const cache = new CellMeasurerCache({
      defaultHeight: 79,
      fixedWidth: true,
    });

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        columnIndex={0}
        parent={parent}
        rowIndex={index}
      >
        {({ measure }) => (
          <div style={style}>
            <Apeeps apeep={apeep} onResize={measure} />
            <Divider borderColor="gray.700" width="100%" spacing={0} />
          </div>
        )}
      </CellMeasurer>
    );
  };

  return (
    <div className="list-apeeps">
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            rowCount={apeeps.length}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            deferredMeasurementCache={cache}
            overscanRowCount={10}
          />
        )}
      </AutoSizer>
    </div>
  );
}

function Apeeps({ apeep, onResize }) {
  const [userInfo, SetUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const response = await getUserApi(apeep.userId);
      if (isMounted) {
        SetUserInfo(response);
        setAvatarUrl(
          response?.avatar
            ? `${API_HOST}/obtain_Avatar?id=${response.id}`
            : Placeholder
        );
        onResize();
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [apeep, onResize]);

  return (
    <Flex align="start" py={4} className="apeep">
      <Skeleton
        isLoaded={!!userInfo}
        borderRadius="50%"
        startColor="#192734"
        endColor="#15212b"
      >
        <Avatar
          src={avatarUrl || Placeholder}
          alt={userInfo?.name}
          size="lg"
          mr={4}
          className="apeep__avatar"
        />
      </Skeleton>
      <Flex direction="column" flex="1">
        <Flex align="center">
          <Text fontWeight="bold" fontSize="lg">
            {userInfo?.name} {userInfo?.lastName}
          </Text>
          {userInfo?.isVerified && (
            <Image
              src={CheckBadge}
              alt="Check Badge"
              boxSize={6}
              style={{ width: "16px", height: "16px", marginLeft: "10px" }}
            />
          )}
          <Text fontSize="sm" fontWeight="normal" color="gray.500" ml={2}>
            @username
          </Text>
          <Text color="gray.500" ml={2} mr={1}>
            ·
          </Text>
          <Text fontSize="sm" fontWeight="normal" color="gray.500" ml={2}>
            {luxon.DateTime.fromISO(apeep.date).toRelative()}
          </Text>
        </Flex>
        <Box>{replaceURLWithHTMLLinks(apeep.message)}</Box>
        {apeep.gifUrl && (
          <Box mt={2} overflow="hidden" borderRadius="10px">
            <Image
              src={apeep.gifUrl || Skeleton}
              alt="gif"
              width="100%"
              maxHeight="300px"
              objectFit="cover"
              onLoad={onResize}
            />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}
