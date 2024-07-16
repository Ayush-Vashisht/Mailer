"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import React, { useState } from "react";
import axios from "axios";

export default function Mail() {
  const [email, setEmail] = useState<string>("");
  // const [emails, setEmails] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    try {
      const emails = email.split(',').map((email)=>email.trim());
      console.log(emails)
      const response = await axios.post("api/mail", { emails, content });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending mail", error);
    }
  }
  return (
    <div className="flex flex-col min-h-screen items-center w-full justify-center gap-2">
      <Input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Textarea
        placeholder="Enter content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="button" onClick={(e)=>handleSubmit(e)}>
        send{" "}
      </button>
    </div>
  );
}
