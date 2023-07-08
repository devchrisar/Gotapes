import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faCamera } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  Input,
  Textarea,
  Button,
  Box,
  Icon,
  Heading,
  CircularProgress,
  Flex,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import AsyncSelect from "react-select/async";
import * as Yup from "yup";

import { API_HOST } from "../../../utils/constant";
import {
  uploadBannerApi,
  uploadAvatarApi,
  updateInfoApi,
  getUserApi,
  searchUserApi,
} from "../../../api/user";
import Placeholder from "/assets/svg/placeholder.svg";

import slides from "./custom/slidesData";
import { customStyles } from "./custom/customStyles";

import "./EditUserForm.scss";

function DatePickerComponent({
  field,
  handleChange,
  formData,
  birthDateValue,
}) {
  const handleDateChange = useCallback(
    (date) => {
      handleChange(field.name, date);
    },
    [field.name, handleChange],
  );
  const formattedDate = formData[field.name]
    ? new Date(formData[field.name])
    : birthDateValue;
  return (
    <DatePicker
      placeholderText={field.label}
      selected={formattedDate}
      showYearDropdown
      dropdownMode="select"
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      name={field.name}
      value={formattedDate ? formattedDate.toISOString().substring(0, 10) : ""}
    />
  );
}

function BannerComponent({
  field,
  handleChange,
  bannerUrl,
  getRootBannerProps,
  getInputBannerProps,
  formData,
}) {
  const onBannerChange = (e) => {
    handleChange(field.name, e.target.value);
  };
  return (
    <>
      <Box
        className="banner"
        bgImage={`url(${bannerUrl})`}
        bgSize="cover"
        bgPosition="center"
        h="200px"
        w="100%"
        name={field.name}
        value={formData[field.name]}
        onChange={onBannerChange}
        {...getRootBannerProps()}
      >
        <input {...getInputBannerProps()} />
        <FontAwesomeIcon icon={faCamera} />
      </Box>
      <Box className="banner__avatar__container">
        <Box className="banner__avatar" bgImage={Placeholder} />
        <Box>
          <Text>BananaApeLicious🍌</Text>
          <Text color="gray.500">@Gotapes</Text>
        </Box>
      </Box>
    </>
  );
}
function AvatarComponent({
  field,
  handleChange,
  avatarUrl,
  getRootAvatarProps,
  getInputAvatarProps,
  formData,
}) {
  const onAvatarChange = (e) => {
    handleChange(field.name, e.target.value);
  };
  return (
    <Box
      className="edit-user-form__avatar"
      bgImage={`url(${avatarUrl})`}
      bgSize="cover"
      bgPosition="center"
      h="200px"
      w="200px"
      name={field.name}
      value={formData[field.name]}
      onChange={onAvatarChange}
      {...getRootAvatarProps()}
    >
      <input {...getInputAvatarProps()} />
      <FontAwesomeIcon icon={faCamera} />
    </Box>
  );
}

function TextareaComponent({ field, handleChange, formData }) {
  const characterCount = formData[field.name] ? formData[field.name].length : 0;
  const onTextareaChange = (e) => {
    handleChange(field.name, e.target.value);
  };
  return (
    <>
      <Textarea
        placeholder={field.label}
        name={field.name}
        value={formData[field.name]}
        onChange={onTextareaChange}
        resize="none"
        size="sm"
        h="190px"
      />
      <CircularProgress
        size={6}
        trackColor="whiteAlpha.300"
        value={characterCount}
        max={455}
      />
    </>
  );
}

function LocationComponent({ field, handleChange, formData }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    value: formData[field.name],
    label: formData[field.name],
  });

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "http://api.geonames.org/countryInfoJSON?username=gotapes_admin",
      );
      const data = await response.json();
      const countriesData = data.geonames.map((country) => ({
        value: country.countryName,
        label: country.countryName,
      }));
      setCountries(countriesData);
      const selectedOption = countriesData.find(
        (country) => country.value === formData[field.name],
      );
      setSelectedCountry(selectedOption);
    } catch (error) {
      throw new Error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const loadOptions = async (inputValue, callback) => {
    try {
      const response = await fetch(
        `http://api.geonames.org/searchJSON?name=${inputValue}&maxRows=10&username=gotapes_admin`,
      );
      const data = await response.json();
      const cityOptions = data.geonames.map((result) => ({
        value: `${result.name}, ${result.countryName}`,
        label: `${result.name}, ${result.countryName}`,
      }));

      const countryOptions = countries.filter((country) =>
        country.label.toLowerCase().includes(inputValue.toLowerCase()),
      );

      const options = [...cityOptions, ...countryOptions];
      callback(options);
    } catch (error) {
      console.error("Error fetching locations:", error);
      callback([]);
    }
  };

  const handleSelect = (selectedOption) => {
    setSelectedCountry(selectedOption);
    handleChange(field.name, selectedOption.value);
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedCountry}
      onChange={handleSelect}
      placeholder={field.label}
      styles={customStyles}
    />
  );
}

function DefaultComponent({ field, handleChange, formData }) {
  const onInputChange = (e) => {
    handleChange(field.name, e.target.value);
  };
  return (
    <Input
      placeholder={field.label}
      name={field.name}
      value={formData[field.name]}
      onChange={onInputChange}
    />
  );
}

function initialformData(user) {
  return {
    birthDate: user.birthDate ? new Date(user.birthDate) : null,
    username: user.username || "",
    name: user.name || "",
    lastName: user.lastName || "",
    password: user.password || "",
    bio: user.bio || "",
    webSite: user.webSite || "",
    location: user.location || "",
  };
}

export default function EditUserForm({ onClose, user, handleUserUpdate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modifiedFields, setModifiedFields] = useState({});
  const [formData, setFormData] = useState(initialformData(user));
  const [bannerUrl, setBannerUrl] = useState(
    user?.banner ? `${API_HOST}/obtain_Banner?id=${user.id}` : null,
  );
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar ? `${API_HOST}/obtain_Avatar?id=${user.id}` : Placeholder,
  );
  const [bannerModified, setBannerModified] = useState(false);
  const [avatarModified, setAvatarModified] = useState(false);
  const [isBirthDateModified, setIsBirthDateModified] = useState(false);
  const [isFormModified, setIsFormModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  const [birthDateValue, setBirthDateValue] = useState(
    formData.birthDate ? new Date(formData.birthDate) : null,
  );

  const handleSlideChange = (newCurrentSlide) => {
    setCurrentSlide(newCurrentSlide);
  };

  const fetchData = async () => {
    try {
      const updatedData = await getUserApi(user.id);
      setFormData(updatedData);
      handleUserUpdate(updatedData);
    } catch (error) {
      toast.error("Error recovering changes from your profile; retry later.");
      (() => setTimeout(() => window.location.reload(), 4000))();
    }
  };
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    const updateProfile = async () => {
      try {
        if (Object.keys(modifiedFields).length > 0) {
          await updateInfoApi(modifiedFields);
        }
      } catch (error) {
        toast.error("Error updating the profile");
      } finally {
        setIsUpdating(false);
        fetchData();
      }
    };

    if (isUpdating) {
      updateProfile();
    }
  }, [formData, isUpdating]);

  useEffect(() => {
    if (
      (bannerModified && formData.bannerFile && modalClosed) ||
      (avatarModified && formData.avatarFile && modalClosed)
    ) {
      window.location.reload();
    }
    if (bannerModified && formData.bannerFile) {
      uploadBannerApi(formData.bannerFile)
        .then(
          toast.success(
            "Banner uploaded successfully, refresh the page if you don't see the changes",
            {
              className: "toast__container",
              duration: 7000,
            },
          ),
        )
        .catch(() => {
          toast.error("Error uploading the banner, banner must be jpg or png");
        });
    }
    if (avatarModified && formData.avatarFile) {
      uploadAvatarApi(formData.avatarFile)
        .then(() => {
          if (!bannerModified) {
            toast.success(
              "Avatar uploaded successfully, refresh the page if you don't see the changes",
              {
                className: "toast__container",
                duration: 7000,
              },
            );
          }
        })
        .catch(() => {
          toast.error("Error uploading the avatar, avatar must be jpg or png");
        });
    }
  }, [formData, bannerModified, avatarModified, modalClosed]);

  const onDropBanner = useCallback((accetedFile) => {
    const file = accetedFile[0];
    setBannerUrl(URL.createObjectURL(file));
    setFormData((prevData) => ({ ...prevData, bannerFile: file }));
    setBannerModified(true);
  }, []);

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: ["image/jpeg", "image/png"],
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  });

  const onDropAvatar = useCallback((accetedFile) => {
    const file = accetedFile[0];
    setAvatarUrl(URL.createObjectURL(file));
    setFormData((prevData) => ({ ...prevData, avatarFile: file }));
    setAvatarModified(true);
  }, []);

  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: ["image/jpeg", "image/png"],
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });

  const fields = [
    {
      name: "avatar",
      component: Box,
    },
    {
      name: "banner",
      component: Box,
    },
    {
      name: "birthDate",
      label: "Birth Date",
      value: formData.birthDate || birthDateValue,
      component: DatePicker,
    },
    {
      name: "username",
      label: "@Username",
      value: formData.username,
      component: Input,
    },
    {
      name: "name",
      label: "Name",
      value: formData.name,
      component: Input,
    },
    {
      name: "lastName",
      label: "Last Name",
      value: formData.lastName,
      component: Input,
    },
    {
      name: "password",
      label: "Password",
      value: formData.password,
      component: Input,
    },
    {
      name: "bio",
      label: "Add your biography",
      value: formData.bio,
      component: Textarea,
    },
    {
      name: "webSite",
      label: "Add your website",
      value: formData.webSite,
      component: Input,
    },
    {
      name: "location",
      label: "add your current location",
      value: formData.location,
      component: AsyncSelect,
    },
  ];

  const onNextSlide = async () => {
    if (currentSlide < slides.length - 1) {
      if (currentSlide === 3) {
        const { username } = formData;
        const searchUser = await searchUserApi(`search=${username}`);
        if (searchUser && searchUser[0].id !== user.id) {
          setErrors({ ...errors, username: "Username already in use" });
          toast.error("Username already in use", {
            className: "toast__container",
          });
          return;
        }
      }
      handleSlideChange(currentSlide + 1);
    }
  };

  const onPreviousSlide = () => {
    if (currentSlide > 0) {
      handleSlideChange(currentSlide - 1);
    }
  };

  const getValidationSchema = (fieldName) => {
    switch (fieldName) {
      case "username":
        return Yup.object().shape({
          username: Yup.string()
            .required("Username is required")
            .matches(
              /^@[\S]+$/,
              "Username must start with @ and not contain spaces",
            )
            .min(3, "Username is too short")
            .max(20, "Username is too long"),
        });
      case "name":
        return Yup.object().shape({
          name: Yup.string()
            .required("Name is required")
            .min(3, "Name is too short")
            .max(20, "Name is too long"),
        });
      case "lastName":
        return Yup.object().shape({
          lastName: Yup.string()
            .required("Last Name is required")
            .min(3, "Last Name is too short")
            .max(20, "Last Name is too long"),
        });
      case "password":
        return Yup.object().shape({
          password: Yup.string()
            .required("Password is required")
            .matches(
              /^(?=.*\d)(?=.*[a-z])([^\s]){6,}$/,
              "Password must contain at least 6 characters, ⚡ one letter ⚡ one number",
            )
            .min(
              6,
              "Password must contain at least 6 characters, ⚡ one letter ⚡ one number",
            ),
        });
      case "bio":
        return Yup.object().shape({
          bio: Yup.string().max(455, "The biography is too long"),
        });
      case "webSite":
        return Yup.object().shape({
          webSite: Yup.string().matches(
            /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}\b)(?:\/[\/\w\.-]*)*(?:\?[\w\d\.-]*)?(?:#.*)?$/i,
            "The website is not a valid URL",
          ),
        });
      default:
        return null;
    }
  };

  const isSpecialField = (fieldName) => {
    return fieldName === "birthDate" || fieldName === "location";
  };

  const validateFormData = async (validationSchema) => {
    await validationSchema.validate(formData, { abortEarly: false });
  };

  const updateSpecialFields = (fieldName, fieldValue) => {
    if (
      fieldName === "birthDate" &&
      birthDateValue.toISOString() !== formData.birthDate
    ) {
      setFormData((prevData) => ({
        ...prevData,
        birthDate: birthDateValue.toISOString(),
      }));
    }

    if (fieldName === "location" && fieldValue !== formData.location) {
      setFormData((prevData) => ({
        ...prevData,
        location: fieldValue,
      }));
    }
  };

  const handleValidationErrors = (error) => {
    const validationErrors = (error?.inner || []).reduce((errs, err) => {
      errs[err.path] = err.message;
      return errs;
    }, {});

    setErrors(validationErrors);

    const currentField = fields[currentSlide];
    if (currentField.name in validationErrors) {
      toast.error(validationErrors[currentField.name], {
        className: "toast__container",
      });
      return false;
    }
    return true;
  };

  const validateForm = async () => {
    const currentField = fields[currentSlide];
    const originalValue = user[currentField.name] || "";
    const fieldValue = formData[currentField.name] || "";

    if (fieldValue !== originalValue) {
      try {
        const validationSchema = getValidationSchema(currentField.name);

        if (!isSpecialField(currentField.name)) {
          await validateFormData(validationSchema);
        }

        updateSpecialFields(currentField.name, fieldValue);
        setIsUpdating(true);
        setModifiedFields((prevFields) => ({
          ...prevFields,
          [currentField.name]: fieldValue,
        }));
      } catch (error) {
        return handleValidationErrors(error);
      }
    } else {
      setIsFormModified(false);
    }

    return true;
  };

  const handleFormSubmission = () => {
    if (currentSlide === slides.length - 1) {
      onClose();
      setModalClosed(true);
      return;
    }

    if (isFormModified) {
      return validateForm().then((isValid) => {
        if (isValid && Object.keys(errors).length === 0) {
          onNextSlide();
        }
      });
    }

    if (Object.keys(errors).length === 0) {
      onNextSlide();
    }

    return Promise.resolve();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setIsFormModified(false);
    if (currentSlide === 3 && errors.username) {
      toast.error(errors.username, {
        className: "toast__container",
      });
      return;
    }

    handleFormSubmission();
  };

  const slide = slides[currentSlide];

  function handleBirthDateChange(value) {
    const formattedDate = value instanceof Date ? value : new Date(value);

    setFormData((prevData) => ({
      ...prevData,
      birthDate: formattedDate,
    }));
    setBirthDateValue(formattedDate);
    setIsFormModified(true);
    setIsBirthDateModified(true);
  }

  const handleChange = (name, value) => {
    if (name === "birthDate") {
      handleBirthDateChange(value);
    } else if (name === "location") {
      setFormData((prevData) => ({
        ...prevData,
        location: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    const currentField = fields[currentSlide];
    const originalValue = user[currentField.name] || "";
    const fieldValue = value || "";

    setIsFormModified(fieldValue !== originalValue);

    if (currentField.name in errors) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[currentField.name];
        return updatedErrors;
      });
    }
    setIsButtonDisabled(
      Object.keys(errors[currentField.name] || {}).length > 0,
    );
  };

  const isFieldEmpty = () => {
    const currentField = fields[currentSlide];

    if (currentField.name === "banner") {
      return !bannerModified && !formData[currentField.name];
    }

    if (currentField.name === "avatar") {
      return !avatarModified && !formData[currentField.name];
    }

    if (currentField.name === "birthDate") {
      const isBirthDateEmpty =
        !isBirthDateModified ||
        !formData[currentField.name] ||
        formData[currentField.name] === user[currentField.name];
      return isBirthDateEmpty;
    }

    if (currentField.name === "password") {
      return !isUpdating && !formData[currentField.name];
    }

    return (
      !formData[currentField.name] ||
      formData[currentField.name] === user[currentField.name]
    );
  };

  let buttonLabel;
  if (currentSlide === slides.length - 1) {
    buttonLabel = "close";
  } else if (isFieldEmpty()) {
    buttonLabel = "discard for now";
  } else {
    buttonLabel = "next";
  }
  const getComponent = (field) => {
    switch (field.component) {
      case DatePicker:
        return DatePickerComponent;
      case Box:
        if (field.name === "avatar") {
          return AvatarComponent;
        } else if (field.name === "banner") {
          return BannerComponent;
        }
        break;
      case Textarea:
        return TextareaComponent;
      case AsyncSelect:
        return LocationComponent;
      default:
        return DefaultComponent;
    }
    return DefaultComponent;
  };

  return (
    <Box className="edit-user-form" p={4}>
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        onSubmit={onSubmit}
      >
        {currentSlide > 0 && (
          <Flex>
            <Button
              onClick={onPreviousSlide}
              className="btn_Back"
              variant="unstyled"
            >
              <Icon as={FontAwesomeIcon} icon={faArrowLeftLong} />
            </Button>
          </Flex>
        )}
        <Heading as="h1" size="lg" mb={4}>
          {slide.title}
        </Heading>
        <Text as="p" color="gray.500">
          {slide.description}
        </Text>
        {fields.map((field, index) => {
          if (index === currentSlide) {
            const FieldComponent = getComponent(field);

            return (
              <FormControl key={field.name}>
                <FieldComponent
                  field={field}
                  formData={formData}
                  handleChange={handleChange}
                  avatarUrl={avatarUrl}
                  getRootAvatarProps={getRootAvatarProps}
                  getInputAvatarProps={getInputAvatarProps}
                  bannerUrl={bannerUrl}
                  getRootBannerProps={getRootBannerProps}
                  getInputBannerProps={getInputBannerProps}
                  isInvalid={!!errors[field.name]}
                />
                {errors[field.name] && (
                  <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
                )}
              </FormControl>
            );
          }
          return null;
        })}
        <Button
          type="submit"
          mt={4}
          className="btn btn-outline-primary btn-submit"
          isDisabled={isButtonDisabled}
        >
          {buttonLabel}
        </Button>
      </motion.form>
    </Box>
  );
}
