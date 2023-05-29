import CustomTheme from "../../../../theme/index.jsx";
export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: CustomTheme.colors.brand.background_grey_dark,
    fontWeight: "bold",
    border: "1px solid #cbd5e0",
    borderRadius: "0.25rem",
    boxShadow: state.isFocused ? "0 0 0 3px #3182ce" : null,
    "&:hover": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 3px #3182ce",
    },
    "&:focus": {
      borderColor: "#3182ce",
      zIndex: 1,
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#007bff" : null,
    color: state.isSelected ? "#fff" : null,
    "&:hover": {
      backgroundColor: CustomTheme.colors.brand.primary,
      opacity: 0.9,
      color: "#fff",
    },
    ...(state.isFocused && {
      backgroundColor: CustomTheme.colors.brand.primary,
      opacity: 0.9,
      color: "#fff",
    }),
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#fff",
    opacity: 0.8,
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: CustomTheme.colors.brand.background_grey_dark,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#0a4f59",
    opacity: 0.8,
    "&:hover": {
      color: CustomTheme.colors.brand.primary,
    },
  }),

  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: "#0a4f59",
    opacity: 0.8,
  }),
};
