import React from "react";
import { Box, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import "./Cookie.scss";

export default function Cookie() {
  return (
    <Box
      p={4}
      bg="white"
      boxShadow="md"
      borderRadius="md"
      maxWidth="600px"
      mx="auto"
      className="cookie"
    >
      <Heading as="h1" fontSize="2xl" mb={4}>
        Cookies Policy
      </Heading>
      <Text fontSize="sm" color="gray.600">
        Last Updated: 14/06/2023
      </Text>

      <Text mt={4} fontSize="md">
        This Cookies Policy applies to your use of our application Gotapes ("the
        App"). By using the App, you consent to the use of cookies and other
        tracking technologies as described in this policy. This policy explains
        how we use these technologies and the options you have to control them.
      </Text>

      <Heading as="h2" fontSize="xl" mt={6} mb={2}>
        1. What technologies do we use?
      </Heading>
      <Text fontSize="md">The App uses the following technologies:</Text>
      <UnorderedList ml={4} mt={2} fontSize="md">
        <ListItem>
          Cookies: Cookies are small text files that are placed on your device
          to uniquely identify your browser or device. They are used for various
          purposes, including authentication and improving user experience.
          Cookies may be session cookies, which are deleted when you close your
          browser, or persistent cookies, which remain on your device for a
          longer period.
        </ListItem>
        <ListItem>
          Local Storage: The App may use local storage to store information
          locally on your device. Local storage is similar to cookies but can
          store more information and may be located in a different location on
          your device.
        </ListItem>
      </UnorderedList>

      <Heading as="h2" fontSize="xl" mt={6} mb={2}>
        2. Categories of tracking technologies
      </Heading>
      <Text fontSize="md">
        The tracking technologies used in the App can be classified into the
        following categories:
      </Text>
      <UnorderedList ml={4} mt={2} fontSize="md">
        <ListItem>
          Authentication and Security: We use these technologies to recognize
          you as a user and ensure the security of your account.
        </ListItem>
        <ListItem>
          Personalization of Content: These technologies help us deliver
          personalized content based on your preferences and interests.
        </ListItem>
        <ListItem>
          Preferences: We use these technologies to remember your settings and
          preferences within the App.
        </ListItem>
        <ListItem>
          Functionality: These technologies enhance the functionality and
          performance of the App.
        </ListItem>
        <ListItem>
          Analytics: We use analytics technologies to analyze how you use the
          App, such as which features you use most frequently and any errors
          encountered.
        </ListItem>
        <ListItem>
          Advertising and Measurement: These technologies enable us to display
          targeted advertisements and measure the effectiveness of our
          advertising campaigns.
        </ListItem>
      </UnorderedList>

      <Heading as="h2" fontSize="xl" mt={6} mb={2}>
        3. Third-party technologies
      </Heading>
      <Text fontSize="md">
        We may work with third-party partners who use tracking technologies on
        the App for analytics and advertising purposes. These partners are
        listed below:
      </Text>
      <UnorderedList ml={4} mt={2} fontSize="md">
        <ListItem>@react-oauth/google</ListItem>
      </UnorderedList>

      <Heading as="h2" fontSize="xl" mt={6} mb={2}>
        4. Controlling these technologies
      </Heading>
      <Text fontSize="md">
        You can manage your preferences regarding personalized ads and
        advertising identifiers on your device settings. You can also control
        cookies and local storage through your browser settings.
      </Text>
      <Text mt={2} fontSize="md">
        Please note that some of these technologies are essential for the
        functioning of the App and cannot be disabled.
      </Text>

      <Heading as="h2" fontSize="xl" mt={6} mb={2}>
        5. More information
      </Heading>
      <Text fontSize="md">
        For more information about cookies and tracking technologies, you can
        refer to the following resources:
      </Text>
      <UnorderedList ml={4} mt={2} fontSize="md">
        <ListItem>
          <a
            href="https://www.allaboutcookies.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            All About Cookies
          </a>
        </ListItem>
        <ListItem>
          <a
            href="https://www.youronlinechoices.eu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Your Online Choices
          </a>
        </ListItem>
        <ListItem>
          <a
            href="https://www.networkadvertising.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Network Advertising Initiative
          </a>
        </ListItem>
      </UnorderedList>

      <Heading as="h2" fontSize="xl" mt={6} mb={2}>
        6. Changes to this policy
      </Heading>
      <Text fontSize="md">
        We may update this Cookies Policy from time to time to reflect changes
        in our practices. When we make significant changes, we will notify you
        through the App or other appropriate means. We encourage you to review
        this policy periodically for any updates.
      </Text>

      <Heading as="h2" fontSize="xl" mt={6} mb={2}>
        7. Contact us
      </Heading>
      <Text fontSize="md">
        If you have any questions or comments about this policy or our privacy
        practices, please contact us at christopherarias@hotmail.es
      </Text>
    </Box>
  );
}
