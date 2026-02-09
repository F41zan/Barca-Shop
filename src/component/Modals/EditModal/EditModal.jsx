import React, { useEffect, useRef } from "react";
import "./EditModal.scss";
import InputField from "../../UX/InputField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const EditModal = ({
  setShowEditModal,
  title = "Edit",
  fields = [],
  defaultValues = {},
  apiConfig,
  storageKey,
  onSuccess
}) => {
  const popUpRef = useRef();
  const onClose = (e) => {
    if (e.target === popUpRef.current) {
      setShowEditModal(false);
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

  const notify = () => {
    toast.success("Edited Successfully !", { autoClose: 1500 });
  };

  const submitData = async (data) => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
    const payload =  apiConfig.payload(data);
    try {
     await axios.patch(
        `${apiConfig.url}/${data[apiConfig.idKey]}`,
        apiConfig.payload(data)
      );  
      console.log("submit:",data)
    } catch (err) {
      console.log(err);
    }
    setShowEditModal(false);
    notify();
    onSuccess(payload);
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
              options={field.options}
            />
          ))}
          <div className="btns">
            <button type="submit" className="sign-in edit">
              {" "}
              Update
            </button>
            <button
              type="button"
              className="sign-in cancel"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
