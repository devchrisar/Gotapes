import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Home.scss";
import BasicLayout from "../../layout/BasicLayout/BasicLayout";
import MessageHelper from "./MessageHelper/MessageHelper";
import ListApeeps from "../../components/ListApeeps/ListApeeps";
import { Stack, StackDivider, Button, Spinner } from "@chakra-ui/react";
import { getApeepsFollowersApi } from "../../api/apeeps";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [apeeps, setApeeps] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingApeeps, setLoadingApeeps] = useState(false);
  const [hasMoreApeeps, setHasMoreApeeps] = useState(true);

  const moreData = () => {
    setLoadingApeeps(true);
    setPage(page + 1);
  };

  function formatModel(apeeps) {
    const apeepsTemp = [];
    apeeps.forEach((apeep) => {
      apeepsTemp.push({
        _id: apeep._id,
        userId: apeep.userrelationid,
        message: apeep.Tweet.message,
        date: apeep.Tweet.date,
      });
    });
    return apeepsTemp;
  }

  useEffect(() => {
    (async () => {
      const response = await getApeepsFollowersApi(page);
      if (response && response.length > 0) {
        setApeeps((prevApeeps) => [...prevApeeps, ...formatModel(response)]);
      } else {
        setHasMoreApeeps(false);
      }
    })();
  }, [page]);

  let buttonContent = "";
  if (!loadingApeeps && loadingApeeps !== 0) {
    if (hasMoreApeeps) {
      buttonContent = "load more";
    } else {
      buttonContent = "No more messages";
    }
  } else {
    buttonContent = <Spinner />;
  }

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <Helmet>
        <title>Gotapes - Home</title>
        <meta
          name="description"
          content="Home | Gotapes, the social network for apes"
        />
      </Helmet>
      <MessageHelper />
      <Stack divider={<StackDivider borderColor="gray.700" width="100%" />}>
        {apeeps && <ListApeeps apeeps={apeeps} />}
        {!loadingApeeps && loadingApeeps !== 0 && (
          <div className="home__load-more-container">
            <Button
              onClick={moreData}
              display="flex"
              className="home__load__load-more"
              variant="unstyled"
              color="#1da0f2"
              m="0 auto"
              mb="10px"
              mt="10px"
              backgroundColor="transparent"
              border={0}
            >
              {buttonContent}
            </Button>
          </div>
        )}
      </Stack>
    </BasicLayout>
  );
}
