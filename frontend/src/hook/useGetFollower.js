import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";
import axios from "axios";

export function useGetFollowed() {
  const { authUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    const getFollowed = async () => {
      setLoading(true);
      const currentUserId = authUser._id;
      try {
        const response = await axios.post("/api/user/followeduser", {
          currentUserId: currentUserId,
        });
        const data = response.data;
        if (response.status === 200) {
          setFollowed(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getFollowed();
  }, []);

  return { loading, followed };
}

export default useGetFollowed;
