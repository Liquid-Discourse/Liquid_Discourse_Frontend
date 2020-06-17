import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";

const TagSelect = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const value = props.value;
  const setValue = props.onChange;

  useEffect(() => {
    const getOptionsFromBackend = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tags`,
        {
          params: {
            type: props.type,
          },
        }
      );
      setOptions(
        response.data.map((tag) => createSelectTagFromBackendTag(tag))
      );
    };
    getOptionsFromBackend();
  }, []);

  const createSelectTagFromBackendTag = (backendTag) => {
    return {
      value: backendTag.id,
      label: backendTag.name,
    };
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  //   label.toLowerCase().replace(/\W/g, '')

  const handleCreate = async (inputValue) => {
    setIsLoading(true);
    // create tag in backend
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/tags`, {
      name: inputValue,
      type: props.type,
    });
    // create option from tag
    const newOption = await createSelectTagFromBackendTag(response.data);
    // set options
    setOptions([...options, newOption]);
    // set current value (sometimes value might be null if empty select)
    if (value) {
      setValue([...value, newOption]);
    } else {
      setValue([newOption]);
    }
    setIsLoading(false);
  };

  return (
    <CreatableSelect
      isMulti
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
  );
};

export default TagSelect;
