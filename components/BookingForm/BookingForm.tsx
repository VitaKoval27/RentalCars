"use client";


import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./BookingForm.module.css";
import toast from "react-hot-toast"


interface BookingFormValues {
    name: string;
    email: string;
    bookingDate: Date | null;
    comment: string;
}


const BookingSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    bookingDate: Yup.date().nullable(),
    comment: Yup.string().max(500, "Too long!"),
});

export default function BookingForm() {

    const initialValues: BookingFormValues = {
        name: "",
        email: "",
        bookingDate: null,
        comment: "",
    };

    const handleSubmit = (values: BookingFormValues, { resetForm }: FormikHelpers<BookingFormValues>) => {
        console.log("Form Data:", values);
        toast.success("Request sent successfully!", {
            duration: 4000,
        });
        resetForm();
    };

    return (
        <div className={css.bookingCard}>
            <div className={css.top}>
                <h3 className={css.title}>Book your car now</h3>
                <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={BookingSchema}
                onSubmit={handleSubmit}
            >
                {/* ДОДАЄМО values ТА setFieldValue СЮДИ */}
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form className={css.form}>
                        <div className={css.fieldWrapper}>
                            <Field
                                name="name"
                                placeholder="Name*"
                                className={css.input}
                            />
                            <ErrorMessage name="name" component="span" className={css.error} />
                        </div>

                        <div className={css.fieldWrapper}>
                            <Field
                                name="email"
                                type="email"
                                placeholder="Email*"
                                className={css.input}
                            />
                            <ErrorMessage name="email" component="span" className={css.error} />
                        </div>

                        <div className={css.fieldWrapper}>
                            <DatePicker

                                selected={values.bookingDate}
                                onChange={(date: Date | null) => setFieldValue("bookingDate", date)}
                                placeholderText="Booking date"
                                className={css.input}
                                dateFormat="dd.MM.yyyy"
                                minDate={new Date()}
                                shouldCloseOnSelect={true}
                                popperPlacement="bottom-start"
                            />
                            <ErrorMessage name="bookingDate" component="span" className={css.error} />
                        </div>

                        <div className={css.fieldWrapper}>
                            <Field
                                as="textarea"
                                name="comment"
                                placeholder="Comment"
                                className={css.textarea}
                            />
                            <ErrorMessage name="comment" component="span" className={css.error} />
                        </div>

                        <button
                            type="submit"
                            className={css.sendBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Send"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}