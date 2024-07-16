"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Mail() {
  const [email, setEmail] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      console.log(emails);
      const response = await axios.post("api/mail", { emails, content });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending mail", error);
    }
  }
  const handleRemoveUser = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && email.trim() !== "") {
      event.preventDefault();
      setEmails([...emails, email.trim()]);
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center w-full justify-center gap-2">
      <div className="flex h-10 w-1/2 rounded-md border border-input bg-background px-3 py-2 text-sm gap-3">
        {emails?.map((email) => (
          <div
            key={email}
            className="flex gap-1 bg-green-200 border rounded-md ring "
          >
            {email}
            <span
              className="cursor-pointer"
              onClick={() => handleRemoveUser(email)}
            >
              &#10539;
            </span>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          placeholder="Emails"
          className="outline-none px-1 flex w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <Textarea
        placeholder="Enter content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="button" onClick={(e) => handleSubmit(e)}>
        send{" "}
      </button>
    </div>
  );
}
