import { useState } from "react";
import "./App.css";

function App() {
  const initialState = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    state: "",
    skills: []
  };
 const calculateAge = (dob) => {
  if (!dob) return null;

  const today = new Date();

  // Split date manually (yyyy-mm-dd)
  const [year, month, day] = dob.split("-").map(Number);

  const birthYear = year;
  const birthMonth = month - 1; // JS months are 0-based
  const birthDay = day;

  let age = today.getFullYear() - birthYear;

  if (
    today.getMonth() < birthMonth ||
    (today.getMonth() === birthMonth && today.getDate() < birthDay)
  ) {
    age--;
  }

  // Prevent future date issue
  if (age < 0) {
    return null;
  }

  return age;
};
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({ ...formData, skills: [...formData.skills, value] });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter((skill) => skill !== value)
      });
    }
  };
const handleSubmit = (e) => {
  e.preventDefault();

  const birthDate = new Date(formData.dob);
  const today = new Date();

  if (birthDate > today) {
    alert("Future Date of Birth is not allowed.");
    return;
  }

  const age = calculateAge(formData.dob);

  if (age < 0) {
    alert("Invalid Date of Birth.");
    return;
  }

  alert(
`First Name: ${formData.firstName}
Last Name: ${formData.lastName}
DOB: ${formData.dob}
Age: ${age}
Gender: ${formData.gender}
Address: ${formData.address}
State: ${formData.state}
Skills: ${formData.skills.join(", ")}`
  );

  setFormData(initialState);
};

  const handleCancel = () => {
    setFormData(initialState);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>User Form</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
  type="date"
  name="dob"
  value={formData.dob}
  onChange={handleChange}
  max={new Date().toISOString().split("T")[0]}
  required
/>

        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            /> Male
          </label>

          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            /> Female
          </label>
        </div>

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <select
  name="state"
  value={formData.state}
  onChange={handleChange}
  required
>
  <option value="">Select State</option>

  <option>Andhra Pradesh</option>
  <option>Arunachal Pradesh</option>
  <option>Assam</option>
  <option>Bihar</option>
  <option>Chhattisgarh</option>
  <option>Goa</option>
  <option>Gujarat</option>
  <option>Haryana</option>
  <option>Himachal Pradesh</option>
  <option>Jharkhand</option>
  <option>Karnataka</option>
  <option>Kerala</option>
  <option>Madhya Pradesh</option>
  <option>Maharashtra</option>
  <option>Manipur</option>
  <option>Meghalaya</option>
  <option>Mizoram</option>
  <option>Nagaland</option>
  <option>Odisha</option>
  <option>Punjab</option>
  <option>Rajasthan</option>
  <option>Sikkim</option>
  <option>Tamil Nadu</option>
  <option>Telangana</option>
  <option>Tripura</option>
  <option>Uttar Pradesh</option>
  <option>Uttarakhand</option>
  <option>West Bengal</option>

  <option disabled>──────────────</option>

  <option>Andaman and Nicobar Islands</option>
  <option>Chandigarh</option>
  <option>Dadra and Nagar Haveli and Daman and Diu</option>
  <option>Delhi</option>
  <option>Jammu and Kashmir</option>
  <option>Ladakh</option>
  <option>Lakshadweep</option>
  <option>Puducherry</option>
</select>
        <div>
          <label>
            <input
              type="checkbox"
              value="Java"
              checked={formData.skills.includes("Java")}
              onChange={handleSkillChange}
            /> Java
          </label>

          <label style={{ marginLeft: "10px" }}>
            <input
              type="checkbox"
              value="Python"
              checked={formData.skills.includes("Python")}
              onChange={handleSkillChange}
            /> Python
          </label>

          <label style={{ marginLeft: "10px" }}>
            <input
              type="checkbox"
              value="C++"
              checked={formData.skills.includes("C++")}
              onChange={handleSkillChange}
            /> React
          </label>
        </div>
        

        <div className="buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default App;