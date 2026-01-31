import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationsErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../../store/slices/applicationSlice";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationsErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      dispatch(deleteApplication(id));
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-5 min-h-[500px]">
          <div className="text-blue-500/30 mb-6">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h1 className="text-white text-xl font-medium mb-2">
            No Applications Yet
          </h1>
          <p className="text-gray-400 text-sm text-center">
            Applications from job seekers will appear here
          </p>
        </div>
      ) : (
        <div className="account_components">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Applications</h3>
            <p className="text-gray-400 text-sm">
              Showing {applications.length} application
              {applications.length !== 1 ? "s" : ""} for your posted jobs
            </p>
          </div>

          <div className="space-y-6">
            {applications.map((element) => {
              return (
                <div
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
                  key={element._id}
                >
                  {/* Job Title Header */}
                  <div className="mb-6 pb-4 border-b border-gray-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-500/20 p-3 rounded-lg">
                          <HiDocumentText className="text-blue-500 text-xl" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">
                            {element.jobInfo.jobTitle}
                          </h4>
                          <p className="text-gray-400 text-sm mt-1">
                            Applied on{" "}
                            {new Date(
                              element.createdAt || Date.now(),
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Applicant Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Name */}
                    <div className="flex items-start gap-3">
                      <FaUser className="text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                          Name
                        </p>
                        <p className="text-white font-medium">
                          {element.jobSeekerInfo.name}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <FaEnvelope className="text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${element.jobSeekerInfo.email}`}
                          className="text-blue-400 hover:text-blue-300 transition break-all"
                        >
                          {element.jobSeekerInfo.email}
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                      <FaPhone className="text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                          Phone
                        </p>
                        <a
                          href={`tel:${element.jobSeekerInfo.phone}`}
                          className="text-blue-400 hover:text-blue-300 transition"
                        >
                          {element.jobSeekerInfo.phone}
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                          Address
                        </p>
                        <p className="text-white">
                          {element.jobSeekerInfo.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="mb-6">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FaFileAlt />
                      Cover Letter
                    </p>
                    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {element.jobSeekerInfo.coverLetter}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={
                        element.jobSeekerInfo &&
                        element.jobSeekerInfo.resume.url
                      }
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <HiDocumentText className="text-lg" />
                      View Resume
                    </Link>
                    <button
                      onClick={() => handleDeleteApplication(element._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600 border border-red-600/50 hover:border-red-600 text-red-400 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Applications;
