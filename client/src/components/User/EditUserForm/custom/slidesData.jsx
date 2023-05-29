import CheckIcon from "/assets/svg/check_accept_mark_icon.svg";
import { Image } from "@chakra-ui/react";
const slides = [
  {
    title: "Select a profile picture",
    description:
      "Do you have a favorite selfie that represents you? Upload it now so everyone can recognize you on Gotapes.",
  },
  {
    title: "Discover the Power of Custom Banners!",
    description:
      "Elevate your profile and captivate visitors with a stunning image that truly represents your unique style and vibrant personality.",
  },
  {
    title: "What is your birth date?",
    description: "Celebrate your birthday in Gotapes.",
  },
  {
    title: "Update your name",
    description:
      "Do you want to change your name in Gotapes? Do it now! Enter the new name you want to display on your profile.",
  },
  {
    title: "Update your last name",
    description:
      "If you want to change your last name in Gotapes, this is the perfect time to do so. Enter your new last name and update your profile.",
  },
  {
    title: "Create your unique biography",
    description:
      "Tell us what makes you special and highlight your interests, passions or experiences in a fun way. Don't worry too much, have fun describing yourself!",
  },
  {
    title: "Add your website",
    description:
      "Do you have a personal website or page that you would like to share with other users? Add the URL of your website so that people can visit it from your Gotapes profile! [e.g. www.mywebsite.com]",
  },
  {
    title: "Add your current location",
    description:
      "Share where you live to discover accounts near you. Connect with people who are in your same location and enjoy local experiences in Gotapes.",
  },
  {
    title: "Your profile is updated",
    description: (
      <Image src={CheckIcon} alt="Check Icon" w="20%" h="20%" m="auto" />
    ),
  },
];

export default slides;
