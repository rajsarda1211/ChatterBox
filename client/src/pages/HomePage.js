import React, { useState, useEffect } from 'react';
import { Container, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) navigate("/chats");
  }, [navigate]);

  const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
      <Container centerContent maxW="container.sm" mt={10} mb={10}>
        <Box textAlign="center" fontSize="2xl" p={5} bg="teal.500" color="white" borderRadius="md" width="100%">
          ChatterBox
        </Box>
        <Box p={5} mt={5} bg="gray.50" borderRadius="md" width="100%" oxshadow="md">
          <Tabs index={tabIndex} onChange={index => setTabIndex(index)} isFitted variant="enclosed" >
            <TabList>
              <Tab _selected={{ color: 'white', bg: 'teal.500' }}>Login</Tab>
              <Tab _selected={{ color: 'white', bg: 'teal.500' }}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm />
              </TabPanel>
              <TabPanel>
                <SignUpForm/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
