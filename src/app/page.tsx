"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";

export default function Home() {
  const {
    data: session, //refetch the session
  } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
        onSuccess: (ctx) => {
          alert("Success");
        },
      },
    );
  };

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <p>Logged In as {session.user.name} </p>
        <Button onClick={(e) => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Create user</Button>
    </div>
  );
}
