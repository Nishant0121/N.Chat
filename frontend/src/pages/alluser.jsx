import { useContext, useState, useEffect } from "react";
import useGetConversation from "../hook/useGetConversation";
import axios from "axios"; // Import axios for API requests
import { AuthContext } from "../context/authcontext";
import toast from "react-hot-toast";
import useGetFollowed from "../hook/useGetFollower";

export default function AllUser() {
  const { authUser } = useContext(AuthContext); // Get logged-in user's information
  const { loading, conversations } = useGetConversation();
  const { followed } = useGetFollowed(); // Assume this returns an array of followed user IDs
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [followedUsers, setFollowedUsers] = useState([]); // State to track followed users

  // Effect to set the followed users when the component mounts or followed list changes
  useEffect(() => {
    // Ensure `followed` is always an array before setting it to state
    if (Array.isArray(followed)) {
      setFollowedUsers(followed);
    } else {
      setFollowedUsers([]); // Default to an empty array if followed is not an array
    }
  }, [followed]); // Only run when followed changes

  const users = conversations?.users || [];

  // Function to filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle follow button click
  const handleFollow = async (userId, user) => {
    try {
      const response = await axios.post(`/api/user/follow`, {
        currentUserId: authUser._id,
        id: userId,
      });

      if (response.status === 200) {
        toast.success(`Followed ${user.fullname}`);
        setFollowedUsers([...followedUsers, userId]); // Update followed users state
      }
    } catch (error) {
      console.error("Error sending follow request", error);
      alert("Failed to send follow request.");
    }
  };

  // Function to check if a user is already followed
  const isUserFollowed = (userId) => {
    return followedUsers.includes(userId);
  };

  return (
    <div className="w-[90vw] max-w-[900px] min-h-[100vh]">
      <div className="flex flex-col items-start justify-start w-full h-full overflow-auto">
        {/* Search input */}
        <div className="w-full my-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 text-white"
          />
        </div>

        {loading && (
          <div className="flex chat-start chat w-full flex-col items-start justify-between gap-4">
            <div className="skeleton h-6 w-6 p-6 rounded-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        )}

        {!loading && filteredUsers.length === 0 && (
          <p className="text-center w-full">No users found</p>
        )}

        {!loading &&
          filteredUsers.map((user) => (
            <div className="w-full" key={user._id}>
              <div className="flex chat-start chat w-full flex-col items-start justify-between gap-4">
                <div className="flex items-center my-2 border-b pb-2 w-full justify-start">
                  <img
                    className="w-10 h-10 rounded-full mr-2"
                    src={user.profilePic}
                    alt={user.fullname}
                  />
                  <span className="text-white">{user.fullname}</span>
                  {/* Follow Button */}
                  <button
                    className={`ml-auto px-4 py-1 rounded-md ${
                      isUserFollowed(user._id)
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                    onClick={() => handleFollow(user._id, user)}
                    disabled={isUserFollowed(user._id)} // Disable if already followed
                  >
                    {isUserFollowed(user._id) ? "Following" : "Follow"}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
