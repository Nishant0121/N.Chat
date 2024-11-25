import useConversation from "../zustand/useConversation";

const useGetSidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useConversation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return { toggleSidebar };
};

export default useGetSidebar;
