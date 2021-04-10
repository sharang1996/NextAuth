import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const KEY = "fehjkbvlrwjnvkglr";

export default function (req: NextApiRequest, res: NextApiResponse) {
  //it should not be a react component
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }
  console.log(req.body);
  const { username, password } = req.body;
  const t = {
    token: jwt.sign(
      {
        username,
        admin: username === "admin" && password === "admin",
      },
      KEY
    ),
  };
  console.log(t);
  res.json(t);
}
