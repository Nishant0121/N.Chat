import useGetFollowed from "../../hook//useGetFollower";
import Loader from "../loder/loder";
import UserConvo from "./user";

export default function UserConversation() {
  const { followed, loading } = useGetFollowed();
  const users = followed?.users || []; // Safely accessing users array

  return (
    <div className="w-full text-black h-[90vh] md:text-white flex flex-col justify-start items-center overflow-y-auto">
      {users.map((user, idx) => (
        <UserConvo
          key={user._id}
          user={user}
          lastIdx={idx === users.length - 1}
        />
      ))}
      <div className="divider px-3"></div>

      {loading ? <Loader /> : ""}
    </div>
  );
}
