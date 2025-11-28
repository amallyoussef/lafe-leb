"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { directusFetch } from "@/app/utils/directusFetch";

interface FormData {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
}

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phone_number)) {
      newErrors.phone_number = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, phone_number: value || "" }));
    if (errors.phone_number) {
      setErrors((prev) => ({ ...prev, phone_number: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await directusFetch({
        collection: "lafeleb_users",
        body: {
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          phone_number: formData.phone_number,
          email: formData.email.trim().toLowerCase(),
        },
        withAuth: true,
        withoutStatus: true,
      });

      router.push("/download");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-8 gap-2">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={180}
            height={60}
            priority
            className="object-contain"
          />
        </div>

        {/* Form Card */}
        <div
          className="rounded-2xl p-8 shadow-lg"
          style={{ backgroundColor: "var(--secondary)" }}
        >
          <h1
            className="text-2xl font-bold text-center mb-2"
            style={{ color: "var(--primary)" }}
          >
            Get your NANO BANANA PRO Ultimate Guide
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Please fill in your details to download the guide
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--primary)" }}
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-transparent outline-none transition-all duration-200 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(31,37,106,0.1)]"
                style={{ backgroundColor: "var(--background)" }}
                placeholder="Enter your first name"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--primary)" }}
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-transparent outline-none transition-all duration-200 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(31,37,106,0.1)]"
                style={{ backgroundColor: "var(--background)" }}
                placeholder="Enter your last name"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--primary)" }}
              >
                Phone Number
              </label>
              <PhoneInput
                international
                defaultCountry="LB"
                value={formData.phone_number}
                onChange={handlePhoneChange}
                className="phone-input-container bg-white rounded-lg"
                inputStyle={{
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                }}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--primary)" }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-transparent outline-none transition-all duration-200 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(31,37,106,0.1)]"
                style={{ backgroundColor: "var(--background)" }}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-red-600 text-sm text-center">
                  {submitError}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Get Access to PDF"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Your information is secure and will not be shared with third parties.
        </p>
      </div>
    </div>
  );
}
