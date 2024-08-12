import React from "react";
import { Box, FormControl, FormLabel, Input, Button, VStack, Image, Center, InputGroup, InputRightElement, FormErrorMessage, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import validator from 'email-validator'
import axios from 'axios';
const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handleConfirmPasswordToggle = () => setShowConfirmPassword(!showConfirmPassword);
  
  const handleProfilePicChange = (e) => {
    const pic = e.target.files[0];
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      setLoading(true);
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "ChatterBox");
      data.append("cloud_name", "sardaraj1211")
      fetch("https://api.cloudinary.com/v1_1/sardaraj1211/image/upload", {
        method: "post",
        body: data,
      }).then((res) => res.json())
      .then((data) => {
        setProfilePic(data.url.toString());
        console.log(data.url.toString());
        toast({
          title: "Image uploaded successfully !!!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    } else {
      toast({
        title: "Please Select an Image in jpeg/png Format Only!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!validator.validate(formData.email)) {
      tempErrors.email = "Enter a valid email.";
    }
    if (!formData.password) tempErrors.password = "Password is required.";
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
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
        const { data }= await axios.post('/api/user', { name: formData.name, email: formData.email, password: formData.password, pic: profilePic }, config);
        console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoading(false);
        navigate('/chats');
      }
      setLoading(false);
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
      <FormControl id="profile-picture">
        <FormLabel>Upload Your Profile Picture</FormLabel>
        <Center>
          <Box
            boxSize="150px"
            borderRadius="full"
            overflow="hidden"
            borderWidth="2px"
            borderColor="gray.200"
            mb={4}
          >
            {profilePic ? (
              <Image src={profilePic} boxSize="150px" objectFit="cover" />
            ) : (
              <Center boxSize="150px" bg="gray.100" color="gray.500" >
                No Image
              </Center>
            )}
          </Box>
        </Center>
        <Center>
          <Input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            p={1}
            width="250px"
            textAlign="center"
          />
        </Center>
      </FormControl>

      <FormControl id="name" isRequired isInvalid={errors.name}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>
      <FormControl id="email" isRequired isInvalid={errors.email}>
        <FormLabel>Email Id</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl id="password" isRequired isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputRightElement>
            <Button
              variant="link"
              onClick={handlePasswordToggle}
              color="teal.500"
              _hover={{ color: "teal.700" }}
              mr={2}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <FormControl id="confirmPassword" isRequired isInvalid={errors.confirmPassword}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <InputRightElement>
            <Button
              variant="link"
              onClick={handleConfirmPasswordToggle}
              color="teal.500"
              _hover={{ color: "teal.700" }}
              mr={2}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
      </FormControl>
      <Button type="submit" colorScheme="teal" width="full" isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUpForm;