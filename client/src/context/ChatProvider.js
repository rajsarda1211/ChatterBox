import { useToast } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    toast({
      title: "Please log in again.",
      description: "User token expired!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    navigate("/");
  };
  
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
      return;
    }

    const decodedToken = jwtDecode(userInfo.token);
    const currentTime = Date.now() / 1000; 

    const timeRemaining = decodedToken.exp - currentTime;

    if (timeRemaining <= 0) {
      handleLogout();
    } else {
      const timer = setTimeout(() => {
        handleLogout();
      }, timeRemaining * 1000); 
      return () => clearTimeout(timer);
    }
  }, [navigate, user]);

  return (
    <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
