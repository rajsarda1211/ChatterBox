import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, VStack, InputGroup, InputRightElement, FormErrorMessage, useToast} from '@chakra-ui/react';
import validator from 'email-validator'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!validator.validate(formData.email)) {
      tempErrors.email = "Enter a valid email.";
    }
    if (!formData.password) tempErrors.password = "Password is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try{
      e.preventDefault();
      if (validate()) {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post('/api/user/login', { email: formData.email, password: formData.password }, config);
        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoading(false);
        navigate('/chats');
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} as="form" onSubmit={handleSubmit}>
      <FormControl id="email" isRequired>
        <FormLabel>Email Id</FormLabel>
        <Input 
          type="email" 
          placeholder="Enter your email" 
          value={formData.email} 
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputRightElement>
            <Button 
              variant="link" 
              onClick={handleClick} 
              color="teal.500" 
              _hover={{ color: 'teal.700' }}
              mr = {2}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>
      <Button type="submit" colorScheme="teal" width="full" isLoading = {loading}>
        Login
      </Button>
    </VStack>
  );
};

export default LoginForm;
