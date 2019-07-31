import React, { useState, useEffect } from "react";

const useForm = ({ initialValues, onSubmit, validate, nodeRef }) => {
  console.log("re-rednder");
  console.log("nodeRef", nodeRef);
  const [formIsDirty, setFormIsDirty] = useState(false);
  const [values, setValues] = useState(initialValues || {});
  const [touchedValues, setTouchedValues] = useState({});
  const [errors, setErrors] = useState({});

  //////// timeout ///////////
  useEffect(() => {
    let silentTimeout;
    silentTimeout = setTimeout(autoSubmit, 2000);
    return () => {
      console.log("clearing timeout");
      clearTimeout(silentTimeout);
    };
  }, [values]);
  ////// timeout /////////

  const handleChange = event => {
    setFormIsDirty(true);
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleBlur = event => {
    const target = event.target;
    const name = target.name;
    setTouchedValues({
      ...touchedValues,
      [name]: true
    });
    const [isValid, e] = validate(values);
    setErrors({
      ...e
    });
  };

  const handleSubmit = event => {
    event.preventDefault && event.preventDefault();
    const [isValid, e] = validate(values);
    setErrors({
      ...e
    });
    if (!isValid) return;
    onSubmit({ values, e });
  };
  const autoSubmit = e => {
    console.log("autoSubmit");
    handleSubmit(e);
  };

  const handleClick = e => {
    console.log("handleClick", nodeRef.current);
    if (nodeRef.current.contains(e.target)) {
      // inside click
      console.log("inside");
      return;
    }
    console.log("submitting...", e);

    // outside click
    handleSubmit();
  };

  useEffect(() => {
    //window.addEventListener("click", handleClick, false);
    return () => {
      //window.removeEventListener("click", handleClick, false);
    };
  }, []);
  return {
    values,
    touchedValues,
    formIsDirty,
    errors,
    handleChange,
    handleSubmit,
    handleBlur
  };
};

export default useForm;
