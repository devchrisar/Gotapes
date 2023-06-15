import React from "react";
import { Box, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import "./Privacy.scss";

export default function Privacy() {
  return (
    <Box
      p={4}
      bg="white"
      boxShadow="md"
      borderRadius="md"
      maxWidth="600px"
      mx="auto"
      className="privacy"
    >
      <Heading as="h1" mb={4}>
        Privacy Policy
      </Heading>
      <Text>Last Updated: 14/06/2023</Text>

      <Text mt={4}>
        This Privacy Policy applies to your use of our application Gotapes
        (&quot;the App&quot;). By using the App, you consent to the collection,
        use, and disclosure of your personal information as described in this
        policy. This policy explains how we collect, store, and protect your
        personal information and the choices you have regarding the use of that
        information.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        Information We Collect
      </Heading>
      <Text>
        We may collect the following types of information when you use the App:
      </Text>
      <UnorderedList ml={4}>
        <ListItem>
          - Name: We collect your name to personalize your experience and
          facilitate user authentication.
        </ListItem>
        <ListItem>
          - Last Name: We collect your last name to personalize your experience
          and facilitate user authentication.
        </ListItem>
        <ListItem>
          - Birthdate: We collect your birthdate for age verification purposes
          and to provide age-appropriate content.
        </ListItem>
        <ListItem>
          - Email: We collect your email address to communicate important
          updates and notifications.
        </ListItem>
      </UnorderedList>

      <Heading as="h2" mt={6} mb={2}>
        How We Use Information
      </Heading>
      <Text>
        We use the collected information, including name, last name, birthdate,
        and other relevant details, for the sole purpose of providing and
        improving the App. Specifically, we use this information to:
      </Text>
      <UnorderedList ml={4}>
        <ListItem>
          - Facilitate user authentication and account management.
        </ListItem>
        <ListItem>
          - Personalize the App experience based on user preferences and
          settings.
        </ListItem>
        <ListItem>
          - Communicate with users regarding app updates, features, and
          important notices.
        </ListItem>
        <ListItem>
          - Generate aggregated statistical data to analyze and improve the
          performance and functionality of the App.
        </ListItem>
      </UnorderedList>
      <Text>
        We do not share this information with any third parties except as
        necessary to provide the App&apos;s core functionality. Your personal
        information is treated with the utmost confidentiality and is securely
        stored in our database.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        Information Sharing and Disclosure
      </Heading>
      <Text>
        We may share your information with the following third parties:
      </Text>
      <UnorderedList ml={4}>
        <ListItem>
          - RabbitMQ: User messages sent from our application are shared with
          RabbitMQ, a message broker that works as a queue. This allows us to
          process and deliver messages efficiently. The shared information
          consists solely of user-generated messages and does not include any
          personal user information beyond the content of the message itself.
        </ListItem>
        <ListItem>
          - Cloudinary: If you choose to upload an avatar or banner, we may
          share the image files with Cloudinary, a third-party service provider
          that helps us store and manage these images securely. We do not share
          any other personal user information with Cloudinary.
        </ListItem>
      </UnorderedList>

      <Heading as="h2" mt={6} mb={2}>
        Data Security
      </Heading>
      <Text>
        We take appropriate measures to protect your information from
        unauthorized access, loss, or misuse. However, please note that no data
        transmission over the internet or storage system can be guaranteed to be
        100% secure.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        User Rights and Choices
      </Heading>
      <Text>
        You have the following rights regarding your personal information:
      </Text>
      <UnorderedList ml={4}>
        <ListItem>
          - Access: You have the right to request access to the personal
          information we hold about you. Upon request, we will provide you with
          a copy of your information within a reasonable timeframe.
        </ListItem>
        <ListItem>
          - Rectification: If you believe that the personal information we have
          about you is inaccurate or incomplete, you have the right to request
          the correction or update of such information.
        </ListItem>
        <ListItem>
          - Deletion: You have the right to request the deletion of your
          personal information from our database. If you choose to exercise this
          right, please contact us using the email provided below, and we will
          promptly delete your information, subject to any legal obligations or
          legitimate business interests that may require us to retain certain
          data.
        </ListItem>
        <ListItem>
          - Opt-Out: You have the right to opt-out of receiving certain
          communications from us. If you no longer wish to receive promotional
          emails or other marketing materials, you can unsubscribe by following
          the instructions included in the communication or by contacting us at
          the email address provided below.
        </ListItem>
      </UnorderedList>
      <Text>
        If you have any questions or wish to exercise any of these rights,
        please contact us at christopherarias@hotmail.es. We will respond to
        your request and address any concerns in a timely manner.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        Third-Party Links and Services
      </Heading>
      <Text>
        The App may contain links to third-party websites or services that are
        not operated by us. We have no control over the content and privacy
        practices of those sites and encourage you to review their privacy
        policies.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        Updates to the Privacy Policy
      </Heading>
      <Text>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the updated policy on this page. Please review
        this Privacy Policy periodically for any updates.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        Contact Us
      </Heading>
      <Text>
        If you have any questions or concerns about this Privacy Policy or our
        privacy practices, please contact us at christopherarias@hotmail.es
      </Text>
    </Box>
  );
}
