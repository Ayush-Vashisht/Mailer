"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendMail } from "@/lib/actions/mail.action";
import axios from "axios";

export default function Mail() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");

  async function handleSubmit() {
    try {
      const response = await axios.post("api/mail", { email, content });
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
      <button type="button" onClick={handleSubmit}>
        send{" "}
      </button>
    </div>
  );
}
