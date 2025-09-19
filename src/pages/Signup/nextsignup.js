import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function NextSignUp() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry,setSelectedCountry]=useState();
  const [states, setStates]= useState([]);
  const [selectedState,setSelectedState]=useState();
  const [cities,setCities]= useState([]);
  const [selectedCity,setSelectedCity]=useState();
  const [addressLine,setAddressLine]=useState();
  const [zipcode,setZipcode]=useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-all-countries", {
          headers: {
            "accept": "*/*"
          }
        });

        setCountries(response.data);
      }
      catch (err) {
        console.error("Error in fetching countries: ", err)
      }
    };
    fetchData();

  }, []);

  const handleCountryChange=async(e)=>{
    try{
      const res= await axios.get("https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-state",
        {params:{
          "countryName":e.target.value
        }},{headers:{
          "accept": "*/*"
        }}
        
      )
      setSelectedCountry(e.target.value);
      console.log(e.target.value)
      setStates(res.data.state);
    }
    catch(err){
        console.error("Error in fetching states: ",err)
    }
    
  }

  const handleStateChange=async(e)=>{
    try{
      const res=await axios.post("https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-cities-in-a-state",
        {
          "country":selectedCountry,
          "state":e.target.value
        },{
        header:{
         "Content-Type": "application/json",
                        "accept": "*/*",
        }
      })
      setSelectedState(e.target.value)
      setCities(res.data.cities);
    }
    catch(err){
      console.error("Error in fetching cities: ",err)
    }
  }

  const handleCityChange=(e)=>{
    setSelectedCity(e.target.value)
  }

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    dob: "",
    gender: "",
    addresses: [{
      addressLine: "",
      city: "",
      state: "",
      zipcode: "",
      country: ""
    }]

  });

  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name must contain only letters";
    }
    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last name must contain only letters";
    }
    if (!/^[A-Za-z""]+$/.test(formData.middleName)) {
      newErrors.lastName = "Middle name must contain only letters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
    
      const payload = {
        userId: userId,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        username: formData.username,
        dateOfBirth: formData.dob,
        gender: formData.gender,
        addresses: [{
          addressLine: addressLine,
          city: selectedCity,
          state: selectedState,
          zipcode: zipcode,
          country: selectedCountry
        }]


      }


      try {
        const res = await axios.put("https://amalgamateauthenticationapi.azurewebsites.net/api/Account/update-user", payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }

        });
        console.log("this is the response", res)
        if (res?.status === 200) {
          localStorage.setItem("userData", JSON.stringify(res.data.userDetails));
          navigate('/dashboard')
        }

      } catch (err) {
        setMessage(err.response?.data?.message || "Signup failed. Try again.");
      }
      finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Personal Details</h2>
        <form className="col-md-9card p-4 shadow-lg" onSubmit={handleSubmit}>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">First Name</label>
              <input type="text" name="firstName" className="form-control"
                value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Middle Name</label>
              <input type="text" name="middleName" className="form-control"
                value={formData.middleName} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" name="lastName" className="form-control"
                value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" name="username" className="form-control"
              value={formData.username} onChange={handleChange} required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Date of Birth</label>
              <input type="date" name="dob" className="form-control"
                value={formData.dob} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Gender</label>
              <select name="gender" className="form-select"
                value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Other</option>
              </select>
            </div>
          </div>

          <h5 className="mt-4">Address</h5>
          <div className="mb-3">
            <label className="form-label">Address Line</label>
            <input type="text" name="addressLine" className="form-control"
              value={addressLine} onChange={e=>{setAddressLine(e.target.value)}} required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Country</label>
              <select
                name="country"
                className="form-select"
                value={selectedCountry}
                onChange={handleCountryChange}
                required><option value=""  >Select</option>
                {countries.map((country) => (

                  <option key={country.label} value={country.value}>{country.label}</option>

                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">State</label>
              <select
              name="state"
              className="form-select"
              value={selectedState}
              onChange={handleStateChange}
              disabled={!states.length}
              required>
                <option value="" >Select </option>
                {states.map((state)=>(
                  <option key={state.label} value={state.value}>{state.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">City</label>
              <select
              name="city"
              className="form-select"
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!cities.length}
              required>
                <option value="" >Select </option>
                {
                  cities.map((city)=>(
                    <option key={city.label} value={city.value}>{city.label} </option>
                  ))
                }
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Zipcode</label>
              <input type="text" name="zipcode" className="form-control"
                value={zipcode} onChange={e=>{setZipcode(e.target.value)}} required />
            </div>

          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading} variant="contained">
            {loading ? (<CircularProgress style={{ "size": 18, "color": "inherit" }} />) : (" Submit")}
          </button>
        </form>

        {message && (
          <div className="alert alert-info mt-3 text-center">{message}</div>

        )}
      </div>
    </div>
  )
}