import React from "react";
import Select, { components, StylesConfig } from "react-select";

const FormatSelect = ({ resource, selected }) => {
  const response = resource ? resource.read() : "";

  const data = response ? response : [];

  let placeholder = "Choose";
  const SingleValue = (props) => {
    return (
      <components.SingleValue {...props}>
        {props.data.title}
      </components.SingleValue>
    );
  };

  const Option = (props) => {
    const { title, subTitle } = props.data;

    return (
      <components.Option {...props}>
        <span className="option_header">{title}</span>
        <span className="option_info">{subTitle}</span>
      </components.Option>
    );
  };

  const customStyles: StylesConfig<any, false> = {
    menu: (styles) => ({
      ...styles,
      borderRadius: "16px",
      zIndex: 9999,
    }),
    singleValue: (styles) => ({
      ...styles,
      fontWeight: 700,
    }),
    option: (provided, state) => ({
      ...provided,
      padding: 10,
      backgroundColor:
        state.isFocused || state.isSelected ? "#e0e0e0" : "transparent",
      "&:hover": {
        backgroundColor: "#e0e0e0",
      },
    }),
    control: (provided: Record<string, unknown>, state: any) => ({
      ...provided,
      textAlign: "left",
      borderRadius: "8px",
      border: state.isFocused ? "2px solid #3b4a57" : "2px solid #3b4a57",
      boxShadow: state.isFocused ? "none" : "none",
      // "&": {
      //   border: "1px solid #cccccc",
      //   boxShadow: "none"
      // },
      "&:hover": {
        border: "2px solid #3b4a57",
        boxShadow: "none",
      },
      // "&:focus": {
      //   border: "1px solid #ff8b67",
      //   boxShadow: "0px 0px 6px #ff8b67"
      // },
      // "&:acitve": {
      //   border: "1px solid #ff8b67",
      //   boxShadow: "0px 0px 6px #ff8b67"
      // }
    }),
  };

  return (
    <Select
      styles={customStyles}
      options={data}
      closeMenuOnSelect={true}
      onChange={selected}
      isMulti={false}
      placeholder={placeholder}
      className="formatSelect"
      classNamePrefix="fs"
      getOptionLabel={(options: any) => {
        return `${options.title} ${options.subTitle}`;
      }}
      components={{ SingleValue, Option }}
    />
  );
};

export default FormatSelect;
