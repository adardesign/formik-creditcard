import React, { useRef } from "react";
import useForm from "./hooks/useHookedForm";

const validator = values => {
  const errors = {};
  let isValid = false;
  if (!values.number) {
    errors.number = "Please enter a name";
    isValid = false;
  }

  return [isValid, errors];
};

const InlineForm = props => {
  const { mode, data } = props;

  const {
    values,
    touchedValues,
    formIsDirty,
    errors,
    handleChange,
    handleSubmit,
    handleBlur
  } = useForm({
    initialValues: { ...data },
    onSubmit(values, errors) {
      console.log(JSON.stringify({ values, errors }, null, 2));
    },
    validate: validator
  });
  return (
    <form onSubmit={handleSubmit}>
      <pre>
        <code>Errors: {JSON.stringify(errors, null, 2)}</code>
        <hr />
        <code>Values: {JSON.stringify(values, null, 2)}</code>
        <hr />
        <code>formIsDirty: {formIsDirty.toString()}</code>
      </pre>
      <div>
        <input
          value={values.number}
          onChange={handleChange}
          onBlur={handleBlur}
          name="number"
          placeholder="number"
          type="text"
        />
        {errors.number && <p>{errors.number}</p>}
      </div>

      <div>
        <input
          value={values.expMonth}
          onChange={handleChange}
          onBlur={handleBlur}
          name="expMonth"
          placeholder="expMonth"
          type="text"
        />
        {errors.expMonth && <p>{errors.expMonth}</p>}
      </div>

      <div>
        <input
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name="expYear"
          placeholder="expYear"
          type="text"
        />
        {errors.expYear && <p>{errors.expYear}</p>}
      </div>

      <div>
        <input
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name="name1"
          placeholder="name1"
          type="text"
        />
        {errors.name1 && <p>{errors.name1}</p>}
      </div>
      <button type="submit">Submit</button>
      {mode === "edit" && <button type="submit">Submit</button>}
    </form>
  );
};

export default InlineForm;
