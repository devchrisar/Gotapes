import React, { useEffect, useState } from "react";
import "./User.scss";
import { Button, Spinner } from "@chakra-ui/react";
import BasicLayout from "../../layout/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { getUserApi } from "../../api/user";
import toast from "react-hot-toast";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  console.log(id);

  useEffect(() => {
    getUserApi(id)
      .then((response) => {
        setUser(response);
      })
      .catch(() => {
        toast.error("User not found");
      });
  }, [id, toast]);

  return (
    <BasicLayout className="user">
      <div className="user__title">
        <h2>Christopher Henry Arias Arcia</h2>
      </div>
      <div>User Banner</div>
      <div>User info</div>
      <div className="user__apeeps">Apeeps List</div>
    </BasicLayout>
  );
}

export default User;
