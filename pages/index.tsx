import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("You are not logged in!");
  const [secretMessage, setSecretMessage] = useState<string>("");

  async function submitForm(event) {
    event.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((t) => t.json())
      .catch((e) => {
        console.log(e);
      });
    const token = res.token;
    //console.log(token);

    if (token) {
      const json = jwt.decode(token) as { [key: string]: string };
      setMessage(
        `Welcome ${json.username} you are ${
          json.admin ? "an admin" : "not an admin"
        }`
      );

      const res = await fetch("/api/secret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((t) => t.json())
        .catch((e) => {
          console.log(e);
        });

      if (res.secretAdminCode) {
        setSecretMessage(res.secretAdminCode);
      } else {
        setSecretMessage("nothing available!");
      }
    } else {
      setMessage("Something went wrong!");
    }
  }

  return (
    <div>
      <h1>{message}</h1>
      <h1>Secret : {secretMessage}</h1>
      <form>
        <input
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Login" onClick={submitForm} />
      </form>
    </div>
  );
}

// function Heading(props) {
//   return (
//     <div>
//       <h1 className={styles.red}>
//         <span>I'm red </span>
//         {props.heading}
//       </h1>
//     </div>
//   );
// }

// export default function Home() {
//   return (
//     <div>
//       <Heading heading="heading" />
//       <h1>Here</h1>
//     </div>
//   );
// }

// Styled-JSX
// export default function Home() {
//   return (
//     <div className="title">
//       <h1>Hello World</h1>
//       <style jsx>
//         {`
//           .title {
//             color: red;
//           }
//         `}
//       </style>
//     </div>
//   );
// }
