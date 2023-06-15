import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import "./Tos.scss";

export default function Tos() {
  return (
    <Box
      p={4}
      bg="white"
      boxShadow="md"
      borderRadius="md"
      maxWidth="600px"
      mx="auto"
      className="tos"
    >
      <Heading as="h1" mb={4}>
        Terms of Service
      </Heading>

      <Text mt={4}>
        These Terms of Service (&quot;Terms&quot;) govern your use of our
        application Gotapes (&quot;the App&quot;). By accessing or using the
        App, you agree to be bound by these Terms. If you do not agree with any
        part of these Terms, please refrain from using the App.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        1. Use of the App
      </Heading>
      <Text>
        The App is provided for your personal, non-commercial use only. You may
        not use the App for any illegal or unauthorized purpose. By using the
        App, you agree to comply with all applicable laws and regulations.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        2. Intellectual Property
      </Heading>
      <Text>
        All intellectual property rights in the App and its contents belong to
        us or our licensors. You are granted a limited, non-exclusive,
        non-transferable license to use the App and its content solely for your
        personal, non-commercial purposes. You may not reproduce, distribute,
        modify, or create derivative works of the App or its content without our
        prior written consent.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        3. User Conduct
      </Heading>
      <Text>
        When using the App, you agree to abide by the following rules of
        conduct:
      </Text>
      <Text ml={4} mt={2}>
        - Do not violate any applicable laws or regulations.
      </Text>
      <Text ml={4}>
        - Do not engage in any fraudulent, harmful, or abusive activities.
      </Text>
      <Text ml={4}>
        - Do not interfere with the operation of the App or disrupt other
        users&apos; enjoyment of the App.
      </Text>
      <Text ml={4}>
        - Do not upload or transmit any content that infringes upon the
        intellectual property rights of others or violates their privacy or
        publicity rights.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        4. Limitation of Liability
      </Heading>
      <Text>
        To the extent permitted by law, we shall not be liable for any direct,
        indirect, incidental, consequential, or punitive damages arising out of
        or related to your use of the App. We do not guarantee the accuracy,
        completeness, or reliability of any content available through the App.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        5. Termination
      </Heading>
      <Text>
        We may suspend or terminate your access to the App at any time without
        prior notice or liability for any reason, including if you breach these
        Terms. Upon termination, your rights to use the App will cease, and you
        must immediately cease all use of the App.
      </Text>

      <Heading as="h2" mt={6} mb={2}>
        6. Governing Law
      </Heading>
      <Text>
        These Terms shall be governed by and construed in accordance with the
        laws of Colombia. Any dispute arising out of or in connection with these
        Terms shall be subject to the exclusive jurisdiction of the courts of
        Colombia.
      </Text>
      <Heading as="h2" mt={6} mb={2}>
        7. Disclaimer
      </Heading>
      <Text>
        The App is provided &quot;as is&quot; and &quot;as available&quot; basis
        without warranties of any kind, either express or implied, including,
        but not limited to, implied warranties of merchantability, fitness for a
        particular purpose, and non-infringement. We do not warrant that the App
        will be available, secure, or error-free, that defects will be
        corrected, or that the App is free of viruses or other harmful
        components. We do not warrant or make any representations regarding the
        use or the results of the use of the App in terms of its correctness,
        accuracy, reliability, or otherwise. You assume the entire risk as to
        the results and performance of the App.
      </Text>

      <Text mt={6}>
        If you have any questions about these Terms, please contact us at
        christopherarias@hotmail.es
      </Text>
    </Box>
  );
}
