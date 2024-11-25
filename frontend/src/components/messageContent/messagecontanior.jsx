import MessageInput from "./messageinput";
import Messages from "./messages";
import useConversation from "../../zustand/useConversation.jsx";
import NoChatSelected from "./nochatselected.jsx";
import { useEffect } from "react";
import { useAuthContext } from "../../context/authcontext.jsx";

export default function MessageCont() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  const { authUser } = useAuthContext();

  return (
    <div className=" w-full h-full z-0 md:z-20">
      {selectedConversation ? (
        <div className="relative  w-full h-[90vh] flex m-0 md:ml-2 border-none md:border-l-2 p-0 md:pl-2 flex-col ">
          <div className="absolute top-0 w-full h-full font-bold text-xl bg-transperent text-white pb-0 p-1 shadow">
            <div className=" flex items-center justify-start ">
              <img
                className="w-10 h-10 rounded-full mr-2 "
                src={selectedConversation.profilePic}
                alt=""
                srcSet=""
              />
              {selectedConversation.fullname}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto h-[90vh] z-20 mt-12 mb-12">
            <Messages />
          </div>
          <div className="absolute bottom-0 w-full">
            <MessageInput />
          </div>
        </div>
      ) : (
        <NoChatSelected user={authUser} />
      )}
    </div>
  );
}
