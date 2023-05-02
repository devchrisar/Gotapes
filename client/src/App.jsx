import { useState } from "react";
import "./App.scss";

export default function App() {
  const [user, setuser] = useState({name:"chris"});

  return (
    <div>{user ? <h1>estas logueado</h1> : <h1>no estas logueado</h1>}</div>
  );
}