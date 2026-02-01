import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationsErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

const PostApplication = () => {
  const { singleJob, loading: jobLoading } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications,
  );
  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Salary formatter for annual → monthly display
  const formatSalary = (salary) => {
    if (!salary) return "Not disclosed";
    const annual = parseInt(salary);
    if (isNaN(annual)) return salary;
    const monthly = (annual / 12 / 1000).toFixed(0);
    return `₹${monthly}K/month`;
  };

  // Improved string splitter
  const splitString = (str) => {
    if (!str || typeof str !== "string") return [];
    return str
      .split(/[.;]\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  // Form validation + submission
  const handlePostApplication = (e) => {
    e.preventDefault();

    console.log("yes");

    if (!name.trim() || !email.trim() || !phone) {
      toast.error("Please fill name, email, and phone fields");
      return;
    }

    if (!isAuthenticated || user?.role !== "Job Seeker") {
      toast.error("Please login as Job Seeker to apply");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("phone", phone);
    formData.append("address", address.trim());
    formData.append("coverLetter", coverLetter.trim());

    if (resume && resume instanceof File && resume.size > 0) {
      formData.append("resume", resume);
    }

    dispatch(postApplication(formData, jobId));
  };

  // Resume file handler
  // ✅ UPDATED Resume file handler - accepts IMAGES + PDF
  const resumeHandler = (e) => {
    const file = e.target.files[0];

    // ✅ Updated: Accept images + PDF
    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (file && validTypes.includes(file.type)) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("File size should be less than 5MB");
        e.target.value = "";
        return;
      }
      setResume(file);
      toast.success(
        `✅ ${file.name} selected (${(file.size / 1024 / 1024).toFixed(1)}MB)`,
      );
    } else {
      toast.error("Please select PDF, JPG, JPEG, or PNG file only");
      e.target.value = "";
    }
  };

  // Fetch job details
  useEffect(() => {
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, jobId]);

  // Auto-fill user data
  useEffect(() => {
    if (user && isAuthenticated) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
    }
  }, [user, isAuthenticated]);

  // Handle errors and success
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationsErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCoverLetter("");
        setResume(null);
      }, 2000);
    }
  }, [error, message, dispatch]);

  // Safe data extraction
  const qualification = singleJob?.qualification
    ? splitString(singleJob.qualification)
    : [];
  const responsibilities = singleJob?.responsibilities
    ? splitString(singleJob.responsibilities)
    : [];
  const offers = singleJob?.offers ? splitString(singleJob.offers) : [];

  if (jobLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <article className="application_page">
      {/* Form Section */}
      <form onSubmit={handlePostApplication}>
        <h3>📋 Application Form</h3>

        {/* Job Title - Read Only */}
        <div>
          <label>Job Title</label>
          <input
            type="text"
            value={singleJob?.title || "Loading..."}
            disabled
            style={{ backgroundColor: "#333", opacity: 0.8 }}
          />
        </div>

        {/* Name Field */}
        <div>
          <label>
            Your Name <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label>
            Email <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
          />
        </div>

        {/* Phone Field */}
        <div>
          <label>
            Phone <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="1234567890"
            maxLength={10}
          />
        </div>

        {/* Address Field */}
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Current address"
          />
        </div>

        {/* Cover Letter & Resume - Job Seeker Only */}
        {isAuthenticated && user?.role === "Job Seeker" && (
          <>
            <div>
              <label>Cover Letter</label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={8}
                placeholder="Tell us why you're perfect for this role..."
                style={{ resize: "vertical", minHeight: "120px" }}
              />
            </div>

            <div>
              <label>Resume (PDF, JPG, PNG - max 5MB)</label>
              <input
                type="file"
                // ✅ Updated: Accept images + PDF
                accept="application/pdf,image/jpeg,image/jpg,image/png"
                onChange={resumeHandler}
              />
              {resume && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "#10b981",
                    marginTop: "5px",
                  }}
                >
                  ✅ {resume.name} selected
                </p>
              )}
            </div>
          </>
        )}

        {/* Login Prompt */}
        {!isAuthenticated && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              border: "2px solid gray",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginBottom: "15px", color: "#fff" }}>
              👤 Login To Continue
            </h3>
            <Link
              to="/login"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                border: "1px solid #3b82f6",
                borderRadius: "6px",
                color: "#3b82f6",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Login Now
            </Link>
          </div>
        )}

        {/* Apply Button - Job Seeker Only */}
        {isAuthenticated && user?.role === "Job Seeker" && (
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#666" : "#3b82f6",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
            }}
          >
            {loading ? "Applying..." : "🚀 Apply Now"}
          </button>
        )}
      </form>

      {/* Job Details Section */}
      <div className="job-details">
        <header>
          <h3>{singleJob?.title}</h3>
          {singleJob?.personalWebsite && (
            <Link
              to={singleJob.personalWebsite.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3b82f6", textDecoration: "none" }}
            >
              🌐 {singleJob.personalWebsite.title}
            </Link>
          )}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "10px",
              flexWrap: "wrap",
            }}
          ></div>
        </header>

        <section>
          {/* Job Details Cards */}
          <div className="wrapper">
            <h4
              style={{
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              💼 Job Details
            </h4>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#9ca3af" }}>
                    Pay
                  </span>
                  <div style={{ fontWeight: "600", fontSize: "16px" }}>
                    {formatSalary(singleJob?.salary)}
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#9ca3af" }}>
                    Type
                  </span>
                  <div style={{ fontWeight: "600", fontSize: "16px" }}>
                    {singleJob?.jobType}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />

          {/* Location */}
          <div className="wrapper">
            <h4
              style={{
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              📍 Location
            </h4>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "16px", color: "#9ca3af" }}>
                {singleJob?.location}
              </span>
            </div>
          </div>

          <hr />

          {/* Job Description */}
          <div className="wrapper">
            <h4
              style={{
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              📝 Full Job Description
            </h4>
            <p
              style={{
                fontSize: "16px",
                color: "#9ca3af",
                lineHeight: "1.6",
              }}
            >
              {singleJob?.introduction}
            </p>

            {qualification.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <h5
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  🎓 Qualifications
                </h5>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  {qualification.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: "16px",
                        color: "#9ca3af",
                      }}
                    >
                      - {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {responsibilities.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <h5
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    marginBottom: "12px",
                  }}
                >
                  📋 Responsibilities
                </h5>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  {responsibilities.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: "16px",
                        color: "#9ca3af",
                        marginBottom: "5px",
                      }}
                    >
                      - {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {offers.length > 0 && (
              <div>
                <h5
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  🎁 What We Offer
                </h5>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  {offers.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: "16px",
                        color: "#9ca3af",
                        marginBottom: "5px",
                      }}
                    >
                      - {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <hr />

          {/* Job Niche */}
          <footer>
            <h4
              style={{
                fontSize: "22px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              🔧 Job Niche
            </h4>
            <p
              style={{
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px",
                display: "inline-block",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {singleJob?.jobNiche}
            </p>
          </footer>
        </section>
      </div>
    </article>
  );
};

export default PostApplication;
