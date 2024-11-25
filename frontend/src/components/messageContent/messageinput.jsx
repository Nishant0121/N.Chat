// MessageInput.js
import { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import useSendMessage from "../../hook/useSendMessage";
import Loader from "../loder/loder";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form action="" className="flex" onSubmit={handleSubmit}>
      <div className="w-full flex">
        <input
          type="text"
          placeholder="Enter The Message Here"
          className="input input-bordered w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="p-2">
          {loading ? <Loader /> : <LuSendHorizonal className="h-6 w-6" />}
        </button>
      </div>
    </form>
  );
}
