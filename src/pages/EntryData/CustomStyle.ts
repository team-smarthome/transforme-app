import React from 'react';

export const CustomStyles = {
  container: (provided: any) => ({
    ...provided,
    width: '100%',
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: 'rgb(30 41 59)',
    borderColor: 'rgb(30 41 59)',
    color: 'white',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 3,
    paddingRight: 4.5,
    borderRadius: 5,

    '&:hover': {
      borderColor: 'rgb(30 41 59)',
    },
    '&:active': {
      borderColor: 'rgb(30 41 59)',
    },
    '&:focus': {
      borderColor: 'rgb(30 41 59)',
    },
  }),
  input: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  menu: (provided: any) => ({
    ...provided,
    color: 'white',
    paddingLeft: '5px',
    paddingRight: '5px',
    backgroundColor: 'rgb(30 41 59)',
  }),
  option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      borderRadius: '6px',

      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? ''
          : isFocused
            ? 'rgb(51, 133, 255)'
            : undefined,

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled,
      },
    };
  },
  placeholder: (provided: any) => ({
    ...provided,
    color: 'white',
  }),

  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  multiValue: (styles: any) => {
    return {
      ...styles,
      backgroundColor: 'rgb(51, 133, 255)',
    };
  },
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: 'white',
  }),
};
