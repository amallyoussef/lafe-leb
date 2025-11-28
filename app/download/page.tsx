"use client";

import Image from "next/image";
import Link from "next/link";
import { directus_url } from "../utils/config";

export default function DownloadPage() {
  // PDF file ID from Directus - you can update this with your actual PDF file ID
  const pdfFileId = process.env.NEXT_PUBLIC_PDF_FILE_ID || "your-pdf-file-id";
  const pdfDownloadUrl = `${directus_url}/assets/${pdfFileId}?download`;

  const handleDownload = () => {
    window.open(pdfDownloadUrl, "_blank");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={180}
            height={60}
            priority
            className="object-contain"
          />
        </div>

        {/* Success Card */}
        <div
          className="rounded-2xl p-8 shadow-lg"
          style={{ backgroundColor: "var(--secondary)" }}
        >
          {/* Success Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--primary)" }}
          >
            Thank You!
          </h1>
          <p className="text-gray-600 mb-8">
            Your information has been submitted successfully. Click the button
            below to download your PDF document.
          </p>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download PDF
          </button>

          {/* Back Link */}
          <Link
            href="/"
            className="inline-block mt-6 text-sm transition-all duration-200 hover:opacity-70"
            style={{ color: "var(--primary)" }}
          >
            ← Back to form
          </Link>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm mt-6">
          If you have any issues downloading the file, please contact support.
        </p>
      </div>
    </div>
  );
}

