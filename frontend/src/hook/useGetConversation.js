import axios from "axios";
import { useEffect, useState } from "react";

function useGetConversation() {
  const [loading, setLoading] = useState(false);

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/user");
        const data = response.data;
        if (response.status === 200) {
          setConversations(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
}

export default useGetConversation;
