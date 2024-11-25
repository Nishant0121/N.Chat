import { useState } from "react";
import useConversation from "../../zustand/useConversation.jsx";
import useGetConversation from "../../hook/useGetConversation.js";
import toast from "react-hot-toast";
import useGetSidebar from "../../hook/useGetSidebar.js";
import { FiSearch } from "react-icons/fi";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const { toggleSidebar } = useGetSidebar();

  const user = conversations.users;

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("At least 3 characters should be inputted");
    }
    if (Array.isArray(user)) {
      // Check if conversations is an array
      const userConvo = user.find((c) =>
        c.fullname.toLowerCase().includes(search.toLowerCase())
      );
      if (userConvo) {
        setSelectedConversation(userConvo);
        setSearch("");
        if (window.innerWidth < 786) {
          toggleSidebar();
        }
      } else {
        toast.error("No User Found");
      }
    } else {
      toast.error("Conversations data is not available");
    }
  };

  return (
    <div>
      <form
        onSubmit={handelSubmit}
        className="flex w-full sm:px-3 sm:pt-3 items-center justify-center"
      >
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button
          type="submit"
          className="btn p-1 sm:px-2 btn-active ml-2 text-white btn-primary"
        >
          <FiSearch className="h-7 w-7" />
        </button>
      </form>
    </div>
  );
}
