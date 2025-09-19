import { useState, useEffect, useRef } from "react";
import Footer from "../../component/Footer/footer";
import Header from "../../component/Header/header";
import Sidebar from "../../component/Sidebar/sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile_styles.css";
import CircularProgress from "@mui/material/CircularProgress";
import { updateProfile } from "../../api/auth";

export default function Profile() {
    const [isEditable, setIsEditable] = useState(false);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        bio: "",
        avatar: ""
    });
    // const [countries,setCountries]=useState([]);
    // const [states,setStates]=useState([]);
    // const [cities,setCities]=useState([]);
    // const [selectedCountry,setSelectedCountry]=useState();
    // const [selectedState,setSelectedState]=useState();
    // const [selectedCity,setSelectedCity]=useState();
    // const [addressLine,setAddressLine]=useState();
    // const [zipcode,setZipcode]=useState();

    //     const handleCountryChange=async(e)=>{
    //     try{
    //       const res= await axios.get("https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-state",
    //         {params:{
    //           "countryName":e.target.value
    //         }},{headers:{
    //           "accept": "*/*"
    //         }}

    //       )
    //       setSelectedCountry(e.target.value);
    //       console.log(e.target.value)
    //       setStates(res.data.state);
    //     }
    //     catch(err){
    //         console.error("Error in fetching states: ",err)
    //     }

    //   }

    //   const handleStateChange=async(e)=>{
    //     try{
    //       const res=await axios.post("https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-cities-in-a-state",
    //         {
    //           "country":selectedCountry,
    //           "state":e.target.value
    //         },{
    //         header:{
    //          "Content-Type": "application/json",
    //                         "accept": "*/*",
    //         }
    //       })
    //       setSelectedState(e.target.value)
    //       setCities(res.data.cities);
    //     }
    //     catch(err){
    //       console.error("Error in fetching cities: ",err)
    //     }
    //   }

    //   const handleCityChange=(e)=>{
    //     setSelectedCity(e.target.value)
    //   }


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, avatar: reader.result }));
                setImage(reader.result);
                uploadImage();
            };
            reader.readAsDataURL(file);

        }
    }

    const uploadImage = async () => {
        try {
            
            const res = await updateProfile(formData);
            toast.success(res?.message);
            


        } catch (error) {
            toast.error(error);
        }
    }
    // const uploadImage = async (base64Image) => {
    //     try {

    //         console.log(formData.avatar);

    //         const res = await updateProfile(formData);



    //         if (res?.status === 200) {
    //             toast.success("Profile picture uploaded!")
    //             setImage(res.data.imageUrl);
    //             localStorage.setItem("userData", JSON.stringify(res.data.data))
    //         }
    //     }
    //     catch (err) {
    //         toast.error("Upload Failed !");
    //     }
    // }

    useEffect(() => {
        const data = localStorage.getItem("userData");
        console.log(data);
        if (data) {
            const parsedData = JSON.parse(data);
            setFormData(parsedData);
            // const addr=parsedData.addresses?.[0];
            // if(addr){
            //     setSelectedCountry(addr.country);
            //     setSelectedState(addr.state)
            //     setSelectedCity(addr.city)
            // }

        }
    }, []);

    // useEffect(()=>{
    //     axios.post("https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-all-countries")
    //     .then((res)=>{
    //         setCountries(res.data);
    //     })
    //     .catch((err)=>toast.error("Failed to load countries"));
    // },[])

    // useEffect(()=>{
    //     if(!selectedCountry)return;
    //     setStates([]);
    //     setCities([]);
    //     axios.get(`https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-state?countryName=${selectedCountry}`)
    //     .then((res)=>{
    //         setStates(res.data.state);
    //     })
    //     .catch((err)=>toast.error("Failed to load states"));
    // },[selectedCountry])

    // useEffect(()=>{
    //     if(!selectedCountry || !selectedState)return;

    //     axios.post("https://amalgamateauthenticationapi.azurewebsites.net/api/Countries/get-cities-in-a-state",
    //         {
    //             country:selectedCountry,
    //             state:selectedState
    //         })
    //     .then((res)=>{
    //         setCities(res.data.cities);
    //     })
    //     .catch((err)=>console.error("Failed to load cities"));
    // },[selectedState])


    const handleChange = (e) => {
        if (isEditable) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }

    }
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toISOString().split("T")[0];
    };

    // const handleAddressChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const updatedAddresses = [...formData.addresses];
    //     updatedAddresses[index][name] = value;

    //     setFormData({
    //         ...formData,
    //         addresses: updatedAddresses,
    //     });
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditable) {
            setLoading(true);
            try {
                console.log("inside handlesubmit----------------------")
                const res = await updateProfile(formData);
                toast.success("Profile updated!");
                setIsEditable(false);

            }
            catch (err) {

                toast.error(err.message || "Failed to update!")
                console.log("inside catc-----------")

            }
            finally {
                setLoading(false);
                setIsEditable(false);
            }
            // const payload = {
            //     userId: userId,
            //     firstName: formData.firstName,
            //     middleName: formData.middleName,
            //     lastName: formData.lastName,
            //     username: formData.username,
            //     dateOfBirth: formData.dateOfBirth,
            //     gender: formData.gender,
            //     photos: formData.photos,
            //     addresses: [{
            //         addressLine: formData.addresses[0].addressLine,
            //         city: selectedCity,
            //         state: selectedState,
            //         zipcode: formData.addresses[0].zipcode,
            //         country: selectedCountry
            //     }]


            // }


            //         try {
            //             const res = await axios.put("https://amalgamateauthenticationapi.azurewebsites.net/api/Account/update-user", payload, {
            //                 headers: {
            //                     Authorization: `Bearer ${token}`
            //                 }

            //             });

            //             if (res?.status === 200) {
            //                 localStorage.setItem("userData", JSON.stringify(res.data.userDetails));
            //                 toast.success("Data saved!")
            //                 setIsEditable(prevIsEditable => false);
            //             }

            //     } catch (err) {
            //         setMessage(err.response?.data?.message || "Something went wrong!");
            //     }
            //     finally {
            //         setLoading(false);
            //     }
            // }
            // else {
            //     toast.error("Want to edit data?  Click on edit button")
            // }



        }
    }



    return (
        <>
            <Header />
            <div className="body-area">
                <div className="row w-100">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="profile-details-area col-md-8 ">
                        {/* <h2 className="col-md-12 text-center">Profile Details</h2> */}<br></br>
                        <form className="card p-4 shadow-lg w-100" onSubmit={handleSubmit}>
                            <div className="row d-flex">
                                <div className="position-relative profile-pic-container col-md-3 mb-3 "
                                    onMouseEnter={() => setShowIcon(true)}
                                    onMouseLeave={() => setShowIcon(false)}>
                                    <img src={formData?.avatar ? formData?.avatar : "../assets/no-profile-img.jpeg"}
                                        name="avatar"
                                        className="rounded-circle border border-3 border-secondary  "
                                        width="150"
                                        height="150"
                                        onClick={() => {
                                            fileInputRef.current.click()
                                        }}
                                        style={{ objectFit: "cover" }}
                                    />

                                    {/* {showIcon && (

                                        <div className=" overlay position-absolute bg-dark bg-opacity-50 rounded-circle d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "148px",
                                                height: "148px",
                                                cursor: "pointer",
                                                bottom: "2px",
                                                right: "61px"
                                            }}
                                            onClick={() => {
                                                fileInputRef.current.click()
                                            }
                                            }
                                        >
                                            <FaEdit className="text-white " style={{ marginLeft: "10px", marginTop: "20px" }} />
                                        </div>
                                    )} */}

                                    <input
                                        type="file"
                                        accept="image/"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="d-none"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mb-3">
                                    <label className="form-label" >Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData?.name}
                                        onChange={handleChange} required
                                        disabled={!isEditable} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col mb-3">
                                    <label className="form-label">Bio</label>
                                    <textarea
                                        className="form-control"
                                        name="bio" value={formData?.bio}
                                        onChange={handleChange}
                                        disabled={!isEditable}
                                        required></textarea>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="text"
                                        name="phone"
                                        className="form-control"
                                        value={formData?.phone}
                                        onChange={handleChange}
                                        disabled={!isEditable}
                                        required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col mb-3">
                                    <label className="form-label">Date of Birth</label>
                                    <input type="date" name="dob" className="form-control"
                                        value={formatDate(formData?.dateOfBirth)} onChange={handleChange} required
                                        disabled={!isEditable} />
                                </div>
                                {/* <div className="col-md-6 mb-3">
                                    <label className="form-label">Gender</label>
                                    <select name="gender" className="form-select"
                                        value={formData?.gender} onChange={handleChange} required
                                        disabled={!isEditable}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Non-Binary">Other</option>
                                    </select>
                                </div> */}
                            </div>
                            {/* 
                            <h5 className="mt-4">Address</h5>
                            <div className="mb-3">
                                <label className="form-label">Address Line</label>
                                <input type="text" name="addressLine" className="form-control"
                                    value={formData?.addresses[0].addressLine} onChange={(e)=>handleAddressChange("addressLine",e.target.value)} required
                                    disabled={!isEditable} />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Country</label>
                                    <select
                                        name="country"
                                        className="form-select"
                                        value={selectedCountry}
                                        onChange={handleCountryChange}
                                        disabled={!isEditable}
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
                                        disabled={!states.length || !isEditable}
                                        required>
                                        <option value="" >Select </option>
                                        {states.map((state) => (
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
                                        disabled={!cities.length || !isEditable}
                                        required>
                                        <option value="" >Select </option>
                                        {
                                            cities.map((city) => (
                                                <option key={city.label} value={city.value}>{city.label} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Zip Code</label>
                                    <input type="text" name="zipcode" className="form-control"
                                        value={formData?.addresses[0].zipcode} onChange={(e) =>handleAddressChange("zipcode",e.target.value)} required
                                        disabled={!isEditable} />
                                </div>

                            </div> */}
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-danger w-100 mt-4" onClick={() => setIsEditable(prevIsEditable => true)}
                                        disabled={isEditable}>Edit</button>
                                </div>
                                <div className="col">
                                    <button type="submit" className="btn btn-danger  w-100 mt-4" disabled={loading} variant="contained">
                                        {loading ? (<CircularProgress style={{ "size": 18, "color": "inherit" }} />) : ("Save ")}
                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3500} />
            </div>
            <Footer />
        </>
    )
}