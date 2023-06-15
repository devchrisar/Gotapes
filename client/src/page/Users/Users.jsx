import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import BasicLayout from "../../layout/BasicLayout/BasicLayout";
import ListUsers from "../../components/ListUsers/ListUsers";
import { Button, ButtonGroup, Input, Spinner } from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import queryString from "query-string";
import { getFollowersApi } from "../../api/follow";
import "./Users.scss";

export default function Users({ setRefreshCheckLogin }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeUser, setTypeUser] = useState("follow");
  const [btnLoading, setBtnLoading] = useState(false);
  const [params, setParams] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onSearch = useDebouncedCallback((value) => {
    setUsers([]);
    navigate(
      `?${queryString.stringify({ ...params, search: value, page: 1 })}`
    );
  }, 50);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { page, ...restParams } = params;
        const parsedPage = parseInt(page, 10);

        if (isNaN(parsedPage) || parsedPage <= 0) {
          throw new Error("Invalid page value");
        }
        const query = queryString.stringify({
          ...restParams,
          page: parsedPage,
        });
        const response = await getFollowersApi(query);
        setUsers((prevUsers) => [...prevUsers, ...(response || [])]);
        if (!response || response.length === 0) {
          setBtnLoading(false);
        }
      } catch (err) {
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    const search = searchParams.get("search");
    const page = searchParams.get("page") || 1;
    const type = searchParams.get("type") || "follow";
    setParams({ search, page, type });
  }, [searchParams]);

  useEffect(() => {
    setTypeUser(params.type);
  }, [params.type]);

  const onChangeType = (type) => {
    if (type === typeUser) return;
    setUsers([]);
    setTypeUser(type);
    navigate(`?${queryString.stringify({ type, page: 1, search: "" })}`);
  };

  const handleNewType = () => {
    onChangeType("new");
  };

  const handleFollowType = () => {
    onChangeType("follow");
  };

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  const handleLoadMore = () => {
    setBtnLoading(true);
    const newPage = parseInt(params.page, 10) + 1;
    navigate(`?${queryString.stringify({ ...params, page: newPage })}`);
  };

  const hasMoreUsers = users.length > 0;

  useEffect(() => {
    setBtnLoading(false);
  }, [typeUser]);

  return (
    <BasicLayout
      className="users"
      title="Users"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <Helmet>
        <title>Gotapes - Users</title>
        <meta
          name="description"
          content="See all the users of Gotapes and connect with them. search for users and follow them to see their apeeps."
        />
      </Helmet>
      <div className="users__title">
        <h2>Users</h2>
        <Input
          type="text"
          placeholder="Search user..."
          value={params.search || ""}
          onChange={handleSearch}
        />
      </div>
      <ButtonGroup className="users__options" mb="1rem">
        <Button
          variant="outline"
          flex="1"
          onClick={handleFollowType}
          className={typeUser === "follow" && "active"}
          isDisabled={isLoading}
        >
          followers
        </Button>
        <Button
          variant="outline"
          flex="1"
          onClick={handleNewType}
          className={typeUser === "new" && "active"}
          isDisabled={isLoading}
        >
          new users
        </Button>
      </ButtonGroup>
      {isLoading ? (
        <div className="users__loading">
          <Spinner />
          <h3>Loading...</h3>
        </div>
      ) : (
        <>
          <ListUsers users={users} searchTerm={params.search} />
          {hasMoreUsers && !btnLoading && (
            <div className="users__load-more-container">
              <Button
                onClick={handleLoadMore}
                isLoading={btnLoading}
                display="flex"
                className={`users__load__load-more ${
                  users.length < 5 ? "mt-100vh" : ""
                }`}
                variant="unstyled"
                color="#1da0f2"
                m="0 auto"
                mb="10px"
                mt="10px"
                backgroundColor="transparent"
                border={0}
              >
                {!btnLoading ? "load more" : <Spinner />}
              </Button>
            </div>
          )}
        </>
      )}
    </BasicLayout>
  );
}
