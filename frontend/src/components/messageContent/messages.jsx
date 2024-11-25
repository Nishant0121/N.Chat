import { useRef } from "react";
// Messages.js
import { useEffect } from "react";
import useGetMessages from "../../hook/useGetMessages";
import Message from "./message";
import useListenMessages from "../../hook/useListernMessages";

export default function Messages() {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  console.log(messages);

  return (
    <div className="h-full min-w-[100%]">
      <div className="flex flex-col items-start justify-start w-full h-full overflow-auto">
        {loading && (
          <div className="flex chat-start chat w-full flex-col items-start justify-between gap-4">
            <div className="skeleton h-6 w-6 p-6 rounded-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        )}

        {!loading && messages.length === 0 && (
          <p className="text-center w-full">No messages yet</p>
        )}

        {!loading &&
          messages.length > 0 &&
          messages.map((message) => (
            <div className=" w-full" key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))}
      </div>
    </div>
  );
}
