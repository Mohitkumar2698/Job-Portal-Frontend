import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobsErrors, fetchjobs } from "../store/slices/jobSlice";
import { FaArrowRight, FaSearch, FaHeart, FaRegHeart } from "react-icons/fa";
import { HiSortDescending } from "react-icons/hi";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, SetNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState("newest");
  const [savedJobs, setSavedJobs] = useState([]);

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };

  const handleNicheChange = (niche) => {
    SetNiche(niche);
    setSelectedNiche(niche);
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobsErrors());
    }
    dispatch(fetchjobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche]);

  const handleSearch = () => {
    dispatch(fetchjobs(city, niche, searchKeyword));
  };

  const handleClearFilters = () => {
    setCity("");
    setSelectedCity("");
    SetNiche("");
    setSelectedNiche("");
    setSearchKeyword("");
    setSalaryRange([0, 500000]);
    setSortBy("newest");
    dispatch(fetchjobs("", "", ""));
  };

  // Filter and sort jobs
  // Filter and sort jobs
  const getFilteredAndSortedJobs = () => {
    if (!jobs) return [];

    // Filter by salary
    let filtered = jobs.filter((job) => {
      const salary = parseInt(job.salary);
      // Skip salary filter if salary is not a valid number
      if (isNaN(salary)) return true;
      return salary >= salaryRange[0] && salary <= salaryRange[1];
    });

    // Sort jobs
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.jobPostedOn) - new Date(a.jobPostedOn);
        case "oldest":
          return new Date(a.jobPostedOn) - new Date(b.jobPostedOn);
        case "salary-high":
          const salaryA = parseInt(a.salary) || 0;
          const salaryB = parseInt(b.salary) || 0;
          return salaryB - salaryA;
        case "salary-low":
          const salaryALow = parseInt(a.salary) || 0;
          const salaryBLow = parseInt(b.salary) || 0;
          return salaryALow - salaryBLow;
        case "company":
          return a.companyName.localeCompare(b.companyName);
        default:
          return 0;
      }
    });

    return sorted;
  };

  const filteredJobs = getFilteredAndSortedJobs();

  const Cities = [
    "Chandigarh",
    "Noida",
    "Delhi",
    "Bangalore",
    "Ahmedabad",
    "Hyderabad",
    "Mumbai",
    "Pune",
    "Gurgaon",
    "Kolkata",
    "Chennai",
  ];

  const nicheArray = [
    "Data Scientist",
    "Machine Learning Engineer",
    "Cybersecurity Analyst",
    "Cloud Solutions Architect",
    "Full Stack Developer",
    "MERN Developer",
    "Back-End Developer",
    "DevOps Engineer",
    "Software Developer",
    "AI Researcher",
    "Database Administrator",
    "Mobile App Developer",
    "Web Developer",
    "UI/UX Designer",
    "Systems Analyst",
    "Network Engineer",
    "IT Project Manager",
    "Blockchain Developer",
    "Robotics Engineer",
    "Quality Assurance Tester",
  ];

  return (
    <>
      <section className="jobs bg-gray-900">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar with Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 flex">
              <input
                type="text"
                value={searchKeyword}
                placeholder="Search jobs..."
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="flex-1 bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg rounded-tr-none rounded-br-none focus:outline-none focus:border-blue-500 transition"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer rounded-tl-none rounded-bl-none transition flex items-center gap-2"
              >
                <FaSearch />
              </button>
            </div>

            {/* City Filter */}
            <select
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition md:w-48"
            >
              <option value="">All Cities</option>
              {Cities.map((city, index) => (
                <option value={city} key={index}>
                  {city}
                </option>
              ))}
            </select>

            {/* Niche Filter */}
            <select
              value={niche}
              onChange={(e) => handleNicheChange(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition md:w-56"
            >
              <option value="">All Niches</option>
              {nicheArray.map((niche, index) => (
                <option value={niche} key={index}>
                  {niche}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Filters */}
          <div className="flex flex-col sm:flex-row gap-4 md:hidden">
            <select
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
            >
              <option value="">Filter By City</option>
              {Cities.map((city, index) => (
                <option value={city} key={index}>
                  {city}
                </option>
              ))}
            </select>
            <select
              value={niche}
              onChange={(e) => handleNicheChange(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
            >
              <option value="">Filter By Niche</option>
              {nicheArray.map((niche, index) => (
                <option value={niche} key={index}>
                  {niche}
                </option>
              ))}
            </select>
          </div>

          {/* Salary Range Filter */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <label className="text-white text-sm font-medium mb-3 block">
              Salary Range: ₹{salaryRange[0].toLocaleString()} - ₹
              {salaryRange[1].toLocaleString()}
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={salaryRange[0]}
                onChange={(e) =>
                  setSalaryRange([parseInt(e.target.value), salaryRange[1]])
                }
                className="flex-1 salary-slider"
              />
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={salaryRange[1]}
                onChange={(e) =>
                  setSalaryRange([salaryRange[0], parseInt(e.target.value)])
                }
                className="flex-1 salary-slider"
              />
            </div>
          </div>

          {/* Sort and Stats Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Jobs Count */}
            <div className="text-gray-400 text-sm">
              Showing{" "}
              <span className="text-white font-semibold">
                {filteredJobs.length}
              </span>{" "}
              jobs
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <HiSortDescending className="text-gray-400 text-xl" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
                <option value="company">Company: A-Z</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(city ||
            niche ||
            searchKeyword ||
            salaryRange[0] !== 0 ||
            salaryRange[1] !== 500000) && (
            <div className="flex justify-end">
              <button
                onClick={handleClearFilters}
                className="text-gray-400 hover:text-white transition text-sm underline"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        <div className="wrapper">
          <div className="container">
            <div className="jobs_container">
              {loading ? (
                // Skeleton Loading
                Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="card skeleton-card">
                      <div className="skeleton skeleton-badge"></div>
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-button"></div>
                    </div>
                  ))
              ) : filteredJobs?.length === 0 ? (
                <div className="flex flex-col items-center min-h-[400px]">
                  <div className="text-[#007bff] mb-2 opacity-80">
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </div>
                  <h1 className="text-white text-2xl font-medium tracking-tight mb-2">
                    No jobs found
                  </h1>
                  <p className="text-white/60 text-sm text-center">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              ) : (
                filteredJobs?.map((element) => (
                  <div className="card job-card-animate" key={element._id}>
                    {/* Bookmark Icon */}
                    <button
                      onClick={() => toggleSaveJob(element._id)}
                      className="absolute top-4 right-4 text-xl text-gray-400 hover:text-red-500 transition z-10"
                    >
                      {savedJobs.includes(element._id) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>

                    {element.hiringMultipleCandidates === "Yes" ? (
                      <p className="hiring-multiple">
                        Hiring Multiple Candidates
                      </p>
                    ) : (
                      <p className="hiring">Hiring</p>
                    )}
                    <p className="title">{element.title}</p>
                    <p className="company">{element.companyName}</p>
                    <p className="location">{element.location}</p>
                    <p className="salary">
                      <span>Salary: </span>
                      {isNaN(parseInt(element.salary))
                        ? element.salary
                        : `₹${parseInt(element.salary).toLocaleString()}`}
                    </p>
                    <p className="posted">
                      <span>Posted On: </span>
                      {element.jobPostedOn.substring(0, 10)}
                    </p>
                    <div className="btn-wrapper">
                      <Link
                        className="flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition"
                        to={`/post/application/${element._id}`}
                      >
                        <span>Apply Now</span> <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
