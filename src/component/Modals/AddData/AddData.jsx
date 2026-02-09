import React from "react";
import { useEffect, useRef } from "react";
import InputField from "../../UX/InputField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const AddData = ({
  setShowAddModal,
  title = "Edit",
  fields = [],
  defaultValues = {},
  apiConfig,
  storageKey,
  onSuccess,
}) => {
  const popUpRef = useRef();
  const onClose = (e) => {
    if (e.target === popUpRef.current) {
      setShowAddModal(false);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const submitData = async (data) => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }

    try {
      const res = await axios.post(`${apiConfig.url}`, {
        ...data,
        createdAt: new Date().toLocaleDateString(),
      });
      onSuccess && onSuccess(res.data);
      toast.success("User Added Successfully!", { autoClose: 1500 });
      setShowAddModal(false);
      reset();
    } catch (err) {
      console.error(err);
    }
    console.log("adding data:: ", data);
  };

  return (
    <div className="edit-modal" ref={popUpRef} onClick={onClose}>
      <form action="" onClick={onClose} onSubmit={handleSubmit(submitData)}>
        <div className="edit-header">
          <h3>{title}</h3>
        </div>
        <div className="field-wrapper">
          {fields.map((field) => (
            <InputField
              key={field.name}
              register={register}
              errors={errors}
              name={field.name}
              type={field.type}
              msg={field.msg}
              label={field.label}
              isDimmed={!dirtyFields[field.name]}
            />
          ))}
          <div className="btns">
            <button type="submit" className="sign-in edit">
              {" "}
              Add
            </button>
            <button
              type="button"
              className="sign-in cancel"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddData;
