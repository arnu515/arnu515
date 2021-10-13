import { Dot, Input, Modal, Textarea, useToasts } from "@geist-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import parseError from "../utils/parseError";

type FormValues = {
  email: string;
  full_name: string;
  occupation: string;
  message: string;
};

const ContactForm: React.FC<{ visible?: boolean; onClose?: () => void }> = ({
  visible = false,
  onClose
}) => {
  const [loading, setLoading] = React.useState(false);
  const [, toast] = useToasts();
  const formik = useFormik<FormValues>({
    onSubmit: submit,
    initialValues: {
      email: "",
      full_name: "",
      occupation: "",
      message: "# Markdown supported!"
    },
    validationSchema: yup.object({
      email: yup.string().required().trim().email(),
      full_name: yup.string().required().trim(),
      occupation: yup.string().trim(),
      message: yup.string().required().trim()
    })
  });

  async function submit(values: FormValues) {
    setLoading(true);

    const res = await fetch("/api/contactform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    const data = await res.json();
    if (!res.ok) {
      toast({
        text: `${parseError(data).name}\n${parseError(data).description}`,
        type: "error"
      });
    } else {
      console.log(data);
      toast({
        text: "I will get in touch shortly :)"
      });
    }
    setLoading(false);
    formik.resetForm();
    onClose();
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Title>Contact Me</Modal.Title>
      <Modal.Subtitle>Use this form to contact me!</Modal.Subtitle>
      <Modal.Content>
        <label className="my-2 block font-medium" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          width="100%"
          type={formik.errors.email ? "error" : "default"}
          placeholder="Enter your email"
          onChange={formik.handleChange}
          value={formik.values.email}
          name="email"
          htmlType="email"
        />
        {formik.errors.email && (
          <span className="text-red-500 mt-1 text-sm">{formik.errors.email}</span>
        )}
        <form onSubmit={formik.handleSubmit}>
          <label className="my-2 block font-medium" htmlFor="full_name">
            Full name
          </label>
          <Input
            id="full_name"
            width="100%"
            type={formik.errors.full_name ? "error" : "default"}
            placeholder="Enter your full name"
            onChange={formik.handleChange}
            value={formik.values.full_name}
            name="full_name"
            htmlType="text"
          />
          {formik.errors.full_name && (
            <span className="text-red-500 mt-1 text-sm">{formik.errors.full_name}</span>
          )}
          <label className="my-2 block font-medium" htmlFor="occupation">
            Occupation
          </label>
          <Input
            id="occupation"
            width="100%"
            type={formik.errors.occupation ? "error" : "default"}
            placeholder="Enter your occupation"
            onChange={formik.handleChange}
            value={formik.values.occupation}
            name="occupation"
            htmlType="text"
          />
          {formik.errors.occupation && (
            <span className="text-red-500 mt-1 text-sm">
              {formik.errors.occupation}
            </span>
          )}
          <label className="my-2 block font-medium" htmlFor="message">
            Message
          </label>
          <Textarea
            id="message"
            width="100%"
            type={formik.errors.message ? "error" : "default"}
            placeholder="Enter your mesasge"
            onChange={formik.handleChange}
            value={formik.values.message}
            name="message"
          />
          {formik.errors.message && (
            <span className="text-red-500 mt-1 text-sm">{formik.errors.message}</span>
          )}
        </form>
      </Modal.Content>
      <Modal.Action disabled={loading} onClick={onClose}>
        Cancel
      </Modal.Action>
      <Modal.Action
        type="success-light"
        loading={loading}
        onClick={() => formik.submitForm()}
      >
        Submit
      </Modal.Action>
    </Modal>
  );
};

export default ContactForm;
