import { ViewIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, IconButton, Text, Image } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fallbacks in case user properties are undefined
  const userName = user?.name || 'No Name Provided';
  const userPic = user?.pic || 'https://via.placeholder.com/150'; // Placeholder image
  const userEmail = user?.email || 'No Email Provided';

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="350px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {userName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            p={2}
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={userPic}
              alt={userName}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
              display="flex"
              p={4}
            >
              Email: {userEmail}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

ProfileModal.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    pic: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

export default ProfileModal;
