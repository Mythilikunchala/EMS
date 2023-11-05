import React, { useState, useEffect, Fragment } from "react";
import { Tree } from 'react-d3-tree';
import { format } from "date-fns";
import ReactPaginate from 'react-paginate';
import Pagination from 'react-bootstrap/Pagination';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomContainer from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, CloseButton } from 'react-bootstrap'; // Import the necessary componentsss
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import './style.css';

const CustomToastContainer = ({ toastClassName, bodyClassName, children }) => (
  <div className={toastClassName}>
    <div className={bodyClassName}>
      {children}
    </div>
  </div>
);


const CRUD = () => {
  const [folderData, setFolderData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  
  //ssconst [folders, setFolders] = useState([]);
  const [data, setData] = useState([]);
  const [treeData, setTreeData] = useState([]);
 
  const [pageData,setPageData] = useState([]);

  const[page,setPage] = useState(1);

  const[pageCount,setPageCount] = useState(0);
  console.log(pageCount)
  
  
 // const genderOptions = ["Male", "Female", "Other"];
  const genderOptions = ["Male","Female","Other"];
  const initialSelectedRowData = {
    // Initialize with default values or leave empty as needed
  };
  const [selectedRowData, setSelectedRowData] = useState(initialSelectedRowData);

  useEffect(() => {
    if (selectedRowData) {
      // Determine the initial value for gender based on the table data
      const initialGender =
        selectedRowData.gender || "Other";
  
      // Update selectedRowData with the initial gender value
      setSelectedRowData((prevSelectedRowData) => ({
        ...prevSelectedRowData,
        gender: initialGender,
      }));
    }
  }, [selectedRowData]);

  // Function to check if the form is valid
  const checkFormValidity = () => {
    const isValid = ID && name && phone && gender && address;
    setIsFormValid(isValid);
  };
  
    
  
  // test commit
  
  //test commit 1
  // const validateFields = () => {
  //   if (ID!=='' && name !== '' && gender !== '' && address !== '' && phone !== '' && selectedDate !== null) {
  //     setIsSubmitButtonDisabled(false);
  //   } else {
  //     setIsSubmitButtonDisabled(true);
  //   }
  // };
  //handleSelection(employeeIdToDelete);
  const handleDeleteClick = (employeeId,employeeName) => {
    setEmployeeIdToDelete(employeeId);// Set the ID of the employee to delete
    setEmployeeNameToDelete(employeeName); // Set the name of the employee for display
    setIsDeleteModalOpen(true);// Open the delete confirmation modal
  };
  //const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  /*Submit button enable checking*/
  const [isFormValid, setIsFormValid] = useState(true);  // const isFormValiddata = () => {
  //   return ID && name && phone && dob && gender && address;
  // };
  const [editedData, setEditedData] = useState({
    id: '',
    name: '',
    phone: '',
    gender:'',
    Originalgender:'',
    dob: '',
    address:''
  });
  
  const handleInputChange = (name, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [ID]: value,
      [name]: value,
      [phone]: value,
      [gender]: value,
      [Originalgender]: value,
      [dob]: value,
      [address]: value,
    }));
  };

 

  const handleBlur = () => {
    // Implement your validation logic here
    // Check if all required fields are filled and valid
    const isIdValid = editedData.id.trim() !== '';
    const isNameValid = editedData.name.trim() !== '';
    const isPhoneValid = editedData.phone.trim() !== '';
    const isGenderValid = editedData.gender.trim() !== '';
    const isAddressValid = editedData.address.trim() !== '';
/*    const isDobValid = editedData.dob.trim() !== '';*/
const trimmedDob = editedData.dob instanceof Date ? formatDateForTextBox(editedData.dob) : editedData.dob;
   // const isAddressValid = editedData.address.trim() !== '';

    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Implement your submit logic here
      if (isFormValid) {
        // Form is valid, perform submission
        // ...
      }
    };
    
    // Update the form validity state
    const isFormValid = () => {
      return (
        isIdValid &&
        isNameValid &&
        isPhoneValid &&
       isGenderValid &&
       trimmedDob !== '' && // Check that trimmedDob is not an empty string
        isAddressValid
      );
    };
  };
  const isIdAlreadyExists = (id) => {
    return data.some((item) => item.ID === id);
  };

  const handleNameChange = (e) => {
    SetName(e.target.value);
    //validateFields();
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    //validateFields();
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
   // validateFields();
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    //validateFields();
  };

  

  // const validateAddress = (address) => {
  //   if (!address) {
  //     setAddressError('Please enter the address.');
  //   } else {
  //     setAddressError(''); // Clear the error message if the address is not empty
  //   }
  // };
  
  
  
  // Declare error variables
  const [isClicked, setIsClicked] = useState(false);

  const handleTextboxClick = () => {
    setIsClicked(true);
  };
  
  const [employeeNameToDelete, setEmployeeNameToDelete] = useState('');
  const [address, setAddress] = useState('');
  const [isDataDeleted, setIsDataDeleted] = useState(false); // Track whether data is deleted
  const [errorMessage, setErrorMessage] = useState('');
const [namelengthError, setNamelengthError] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  
  
  const [nameError, setNameError] = useState('');
  const [nameUpdateError, setNameUpdateError] = useState('');
  const [phoneUpdateError, setPhoneUpdateError] = useState('');
  const [addressUpdateError,setAddressUpdateError]=useState('');

  const [selectedDateError, setSelectedDateError] = useState('');

  const [dateValidationError, setDateValidationError] = useState('');

  // Declare edit mode and edit-related variables
  //const [editMode, setEditMode] = useState(false);
  const [Editname, SetEditName] = useState('');
  //const [name, setName] = useState(''); // State for normal mode
 
  //const [address, setAddress] = useState('');
 // const [data, setData] = useState([]);
  const [editEmployeeData, setEditEmployeeData] = useState(null);

  const [editId, SetEditId] = useState('');
  
  const [editName, setEditName] = useState(''); // State for mod/al (edit) mode
  const [EditPhone,SetEditPhone]=useState('');
  //const [EditId,SetEditId]=useState('');
  const [editAge, setEditAge] = useState('');
   //const [editPhone,SetEditPhone]=useState('');
  const[dob,setEditDob]=useState('');
  const[Gender,setEditGender]=useState('');
  const[editTrimmedAddress,setEditTrimmedAddress]=useState('');
  //const [showPopup, setShowPopup] = useState(false);
  
  // const [selectedRowData, setSelectedRowData] = useState({
  //   dob: null,
  //// });
  //const [selectedGender, setSelectedGender] = useState(initialGender);

  
  //const [selectedRowData, setSelectedRowData] = useState({
//   
  // gender: 'Other', // Set the initial value based on your requirements
  //});
  //const genderOptions = ["Male", "Female", "Other"];
  // 

  // Determine the initial value for gender based on the table data
  

      
  const [editNameError, setEditNameError] = useState('');
  const [editIdError, setEditIdError] = useState('');
  const [editPhoneError, setEditPhoneError] = useState('');
  const [editDobError, setEditDobError] = useState('');
 // const [dobError, setDobError] = useState('');
  const [editGenderError, setEditGenderError] = useState('');
  const [editAddressError, setEditAddressError] = useState('');
  const [editNameLengthError, setEditNameLengthError] = useState('');
  //cosnt [nameLengthError, setNameLengthError]=useState('');
  const [employees, setEmployees] = useState([]);
 // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDOBValid, setIsDOBValid] = useState(true);
  const [date, setDate] = useState(new Date());
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [gender, setGender] = useState('');
  const [Originalgender, setOriginalGender] = useState('');
  const [genderError, setGenderError] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const formattedDate1 = selectedDate1 ? format(selectedDate1, "yyyy-MM-dd") : null;
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const [phoneError, setPhoneError] = useState('');
  const [trimmedAddress, setTrimmedAddress] = useState('');
  // const [EditPhone, SetEditPhone] = useState('');
 
  const [phone, setPhone] = useState('');
  //const [dob, setDob] = useState('');
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [noDataAvailable, setNoDataAvailable] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ID, SetID] = useState('');
  const [name, SetName] = useState('');
  const [Age, SetAge] = useState('');
  
  //const [Editname, SetEditName] = useState('');
  const [EditAddress, SetEditAddress] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [Editgender, SetEditGender] = useState('');
  const [EditAge, SetEditAge] = useState('');
  const [Editdob, SetEditDob] = useState('');
  //const [data, SetData] = useState([]);
  const [isActive, SetIsActive] = useState('0');
  const [searchResult, setSearchResult] = useState(true);
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMoalOpen,setIsEditModalOpen]=useState(false);
 
  const [showPopup, setShowPopup] = useState(false);
  const [submitDisabled, setIsSubmitDisabled]=useState(false);

// Define a state variable for 'allFieldsFilled' initially set to 'false'
const [allFieldsFilled, setAllFieldsFilled] = useState(false);



const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(true); // Initially, the button is disabled
const [isNameValid, setIsNameValid] = useState(true); // Initially, name is assumed to be valid
const [isGenderValid, setIsGenderValid] = useState(true); // Initially, gender is assumed to be valid
  
const [isAddressValid, setIsAddressValid] = useState(true); // Initially, gender is assumed to be valid
const [isPhoneValid, setIsPhoneValid] = useState(true); // Initially, gender is assumed to be valid
  
  
  const phonePattern = /^[0-9]{10}$/;
  const genders = [...new Set(data.map((item) => item.gender))];

  // Derive the 'genders' array from the fetched 'data'
  //const genders = [...new Set(data.map((item) => item.gender))];

  // Rest of your component logic
  // ...
  function FolderTree({ folders }) {
    return (
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>
            {folder.name}
            {folder.subfolders && folder.subfolders.length > 0 && (
              <FolderTree folders={folder.subfolders} />
            )}
          </li>
        ))}
      </ul>
    );
  }
  

  const fetchData = async() => {
    // Fetch data on page load without checking the employeeId
   const response=await axios.get('https://localhost:7113/api/Employee')
              setData(response.data);
  }
  //handle next

  const handleNext = () => {
    if (page < pageCount) {
      setPage(page + 1);
    }
  };
  
      
    //handle Previous

const handlePrevious = () =>{
if(page === 1) return page;
setPage(page - 1)

}

const maleData = {
  name: 'Male',
  children: [],
};

const femaleData = {
  name: 'Female',
  children: [],
};

  // Fetch employee data and create the tree hierarchy
  // useEffect(() => {
  //   axios
  //     .get('https://localhost:7113/api/Employee')
  //     .then((response) => {
  //       const jsonData = response.data;

  //       // Create a hierarchy with a root node
  //       const hierarchy = {
  //         name: 'Employees',
  //         children: [],
  //       };

  //       // Separate employees by gender
  //       const maleData = {
  //         name: 'Male',
  //         children: [],
  //       };

  //       const femaleData = {
  //         name: 'Female',
  //         children: [],
  //       };

  //       jsonData.forEach((employee) => {
  //         if (employee.gender === 'Male') {
  //           maleData.children.push({
  //             name: employee.name,
  //           });
  //         } else if (employee.gender === 'Female') {
  //           femaleData.children.push({
  //             name: employee.name,
  //           });
  //         }
  //       });

  //       // Add maleData and femaleData to the hierarchy
  //       hierarchy.children.push(maleData);
  //       hierarchy.children.push(femaleData);

  //       // Set the hierarchy in state
  //       setEmployeeData(jsonData);
  //       setTreeData([hierarchy]);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching employee data:', error);
  //     });
  // }, []);

      useEffect(()=>{fetchData()},[page])

      useEffect (()=>{
        const pagedatacount = Math.ceil(data.length/3)
        setPageCount(pagedatacount);
if(page){
  const LIMIT = 5;
  const skip = LIMIT * page  // 3 * 1 = 3
  const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT,skip);
  setPageData(dataskip)
}


      },[data])
      
 
      const handleEditClick = (rowData) => {
      setSelectedRowData({
      id: rowData.id,
      name: rowData.name,
      phone: rowData.phone,
      dob: formatDateForTextBox(rowData.dob), // Make sure dob is set correctly
      gender: rowData.gender,
      //gender: genderValueFromDataSource,
      address: rowData.address,
      Originalgender:rowData.Originalgender
    });
    console.log('Selected Row Data (Before Edit):', rowData.id,rowData.name,rowData.phone,rowData.gender,rowData.address);
    // Show the popup
    setShowPopup(true);
  };
  
  

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();


  // Filter the data based on the search term
  const filteredData = pageData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setNoDataAvailable(filteredData.length === 0);
    
    // Update the "searchTerm" state
    setSearchTerm(searchTerm);
  };


  useEffect(() => {
    checkFormValidity();
  }, [ID, name, phone, gender, address,dob]);

  
  const handleEmployeeIdChange = (e) => {
    const id = e.target.value;
    setEmployeeId(id);
    //validateFields(); // Call validateFields to perform validation for the employee ID field
  };
  

  // useEffect to fetch data on page load without checking the employeeId
  useEffect(() => {
    fetchData();
    console.log("ID:", ID);
    console.log("name:", name);
    console.log("phone:", phone);
    console.log("dob:", dob);
    console.log("gender:", gender);
    console.log("address:", address);
    console.log("Originalgender:", Originalgender);
    
  
    if (ID && name && phone && dob && gender && address) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [ID, name, phone,dob, gender, address,Originalgender]);

  // useEffect(() => {
  //   // Check if all fields are filled out
  //   const allFieldsFilled = ID && name && phone && dob && gender && address;
    
  //   // Enable or disable the submit button accordingly
  //   setIsSubmitDisabled(!allFieldsFilled);
  // }, [ID, name, phone, dob, gender, address]);
  

 
  // Function to validate the selected date
 
  const validateDate = (date) => {
    if (!date) {
      return 'Please select a date of birth.';
    }
    // Add your date validation logic here
    return ''; // Return an empty string if the date is valid
  };
  // // Handle date change and validation
  // const handleDateChange = (date) => {
  //   // Validate the date
  //   const dateError = validateDate(date);
  
  //   // Update the error message
  //   setDateValidationError(dateError);
  
  //   // Update the selected date or set it to null if there's no error
  //   setSelectedRowData((prevData) => ({
  //     ...prevData,
  //     dob: dateError ? prevData.dob : date,
  //   }));
  // };
  const handleDateChange = (date) => {
    console.log('Date changed:', date);
  
    // Validate the date
    const dateError = validateDate(date);
  
    // Update the error message
    setDateValidationError(dateError);
  
    // Update the selected date or set it to an empty string if there's no error
    setSelectedRowData((prevData) => ({
      ...prevData,
      dob: dateError ? prevData.dob : formatDateForTextBox(date),
    }));
     // Check if all fields are filled out, including DOB
  const allFieldsFilled = ID && name && phone && dob && gender && address;

  // Enable or disable the update button based on validation and field completeness
  setIsUpdateButtonDisabled(!allFieldsFilled || dateError !== null);
  };
  
 const handleDeleteConfirm = () => {
  if (employeeIdToDelete !== null) {
    // Close the delete confirmation modal first
    setIsDeleteModalOpen(false);

    axios
      .delete(`https://localhost:7113/api/Employee/${employeeIdToDelete}`)
      .then((response) => {
        // Handle the successful deletion response
        console.log('Employee deleted:', response.data);
        // Optionally, you can update your UI or perform any other actions after successful deletion

        // Reset the employeeIdToDelete
        setEmployeeIdToDelete(null);
        toast.success('Employee details has been deleted');
        // Fetch updated data
        fetchData();
        setPage(1);
        // const fetchData = async() => {
        //   // Fetch data on page load without checking the employeeId
        //  const response=await axios.get('https://localhost:7113/api/Employee')
        //             setData(response.data);
        // }
        
        
      })
      .catch((error) => {
        // Handle any errors that occur during the DELETE request
        console.error('Error deleting employee:', error);
        // Optionally, you can display an error message or perform error handling here
      });
  }
};


  const validateName = (inputName) => {
    
    if (!/^[A-Za-z\s]+$/.test(inputName)) {
      return 'Please enter a valid Name.';
    } else if (inputName.length > 50) {
      return 'Name should not exceed 50 characters.';
    } else {
      return ''; // No error
    }
  };

  const validateUpdateName = (newUpdateName) => {
    
    if (!/^[A-Za-z\s]+$/.test(newUpdateName)) {
      return 'Please enter a valid Name.';
    } else if (newUpdateName.length > 50) {
      return 'Name should not exceed 50 characters.';
    } else {
      return ''; // No error
    }
  };

  const validatePhone = (inputPhone) => {
    if (inputPhone.length === 0) {
      return 'Contact no is required.';
    } else if (!/^\d+$/.test(inputPhone)) {
      return 'Please enter a valid phone no.';
    } else if (inputPhone.length > 10) {
      return 'Phone no should not exceed 10 digits.';
    } 
  };
  
  const validateUpdatePhone = (newUpdatePhone) => {
    if (!newUpdatePhone.trim()) {
      return 'Contact no is required.';
    } else if (!/^\d+$/.test(newUpdatePhone)) {
      return 'Please enter a valid phone no.';
    } else if (newUpdatePhone.length > 10) {
      return 'Phone no should not exceed 10 digits.';
    }
  
    // No validation errors
    return '';
  };
  
  





  const validateId = (inputId) => {
    if (inputId.length === 0) {
      return 'ID is required.';
    } else if (!/^\d+$/.test(inputId)) {
      return 'Please enter a valid numberid Id.';
    } else {
      return ''; // No error
    }
  };
  
  const validateUpdateAddress = (newUpdateAddress) => {
    if (newUpdateAddress.trim().length === 0) {
      return 'Please enter the address.';
    } else {
      return ''; // Return an empty string when there are no validation errors
    }
  };
  


  /*Format Date:*/
  function formatDateForTextBox(dateString) {
    if (!dateString) return ''; // Return an empty string when no date is selected
    const dateObject = new Date(dateString);
    
    console.log("Date Object:", dateObject);
    
    const formattedDate =
      dateObject.getFullYear() +
      "-" +
      String(dateObject.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(dateObject.getDate()).padStart(2, "0");
    
    console.log("Formatted Date:", formattedDate);
    
    return formattedDate;
  }
  


  const handleDobChange = (newDob) => {
    const formattedDob = formatDateForTextBox(newDob);
    setEditedData((prevData) => ({
      ...prevData,
      dob: formattedDob,
    }));


  };
  

  // In your component, you can use this function to validate the ID field:
  

  const clear = () => {
    SetName(''); 
    SetAge('');
    SetID('');
    setEditName('');
    SetEditAge('');
    SetEditAddress('');
    SetEditId('');
    setPhone('');
    setAddress('');
    setAddressError('');
    setGender('');
    setTrimmedAddress('');
    setEditGender('');
    setSelectedDate(null); // Reset the date picker to null
    SetIsActive('0');
  };
  
  
  const clearErrors = () => {
    setNameUpdateError('');
    setPhoneUpdateError('');
    setAddressUpdateError('');
    setDateValidationError('');
  };

  
  /*Handle Save*/
  
  
  const handleSave = () => {

    if (nameError || phoneError || dateValidationError || genderError || addressError) {
      // Update error state variables
      setEditNameError(nameError);
      setEditPhoneError(phoneError);
      setEditDobError(dateValidationError);
      setEditGenderError(genderError);
      setEditAddressError(addressError);
  
      // Return early, don't proceed with the update
      return;
    }
    // Clear any previous error messages
    setIdErrorMessage('');
    setErrorMessage('');
  
    // Trim address
    const trimmedAddress = address.trim();
    setTrimmedAddress(trimmedAddress);
  
    // Check if the ID already exists in the database
    const urlCheckId = `https://localhost:7113/api/Employee/Exists/${ID}`;
    axios
      .get(urlCheckId)
      .then((response) => {
        if (response.data === true) {
          // ID already exists in the database
          toast.error('An employee with the same ID already exists. Please choose a different ID.');
        } else {
          // ID is unique, proceed with the POST request
          const url = 'https://localhost:7113/api/Employee';
  
          const data = {
            ID: ID,
            name: name,
            gender: gender,
            address: trimmedAddress,
            phone: phone,
            dob: formattedDate,
            isActive: isActive === '1' ? 1 : 0,
          };
  
          axios
            .post(url, data)
            .then((response) => {
              if (response.data === true) {
                // Employee added successfully
               
                fetchData(); // You can update your data here if needed
                
                clear();
                toast.success('Employee details has been added');
               // setIsSubmitButtonDisabled(true);
              } else {
                // Handle the case where the POST request failed
                setIdErrorMessage('An error occurred while processing your request.');
              }
            })
            .catch((error) => {
              // Handle Axios POST request error
              console.error(error);
              setIdErrorMessage('An error occurred while processing your request.');
            });
        }
      })
      .catch((error) => {
        // Handle Axios GET request error
        console.error(error);
        setIdErrorMessage('An error occurred while checking employee existence.');
      });
  };
  

 

  const areAnyFieldsEmptyOrDeleted = () => {
    const { name, gender, address, phone, dob } = selectedRowData;
    // Check if name is empty or exceeds 50 characters
    return !name || name.length > 50 || !gender || !address || !phone || !dob;
  };
  


  
  const handleUpdateClick = () => {
    // Gather the data from the selectedRowData state
    const { id, name, address, phone, dob } = selectedRowData;
    const gender = selectedRowData.gender; // Get gender directly
  
    console.log('Gathered values:', id, name, gender, address, phone, dob);
    const formattedDate = formatDateForTextBox(dob); // Format the dob date
  
    // Include any other data you need to pass here
    handleEditUpdate({
      id: id,
      name: name,
      gender: gender,
      address: address,
      phone: phone,
      dob: formatDateForTextBox(dob) // Use the formatted date
    });
  };

  const handleEditUpdate = ({ id, name, gender, address, phone, dob }) => {
    const formattedDate = selectedRowData.dob;
  const dateValidationError = validateDate(formattedDate);

  // Check if there is a date validation error
  if (dateValidationError) {
    // Display an error message or handle it as needed
    alert('Please select a valid date of birth.');
    return; // Return early if there's a validation error
  }
    
    {/*console.log('Input values:', id, name, gender, address, phone, dob);
  
    // Define validation functions for name, address, gender, and dob
    const nameUpdateError = validateUpdateName(name);
    const phoneUpdateError = validateUpdatePhone(phone);
    const addressUpdateError = validateUpdateAddress(address);
    const dateValidationError = validateDate(dob);
  
    console.log(
      'Validation errors:',
      nameUpdateError,
      phoneUpdateError,
      addressUpdateError,
      dateValidationError
    );
    clearErrors();
    // Check if any validation errors exist
    // if (
    //   nameUpdateError ||
    //   phoneUpdateError ||
    //   addressUpdateError ||
    //   dateValidationError ||
    //   !name ||
    //   !phone ||
    //   !gender ||
    //   !address ||
    //   !dob
    // ) {
      // Display an error message to the user (you can update your UI accordingly)
      console.log(
        'Validation errors:',
        nameUpdateError,
        phoneUpdateError,
        addressUpdateError,
        dateValidationError
      );//
  
      // Handle the case where there are validation errors
      // You can update your UI to display the error messages as needed
      // For example, you can set state variables to display error messages
  
      return; // Don't proceed with the update if there are validation errors
    }*/}
  
    // If all fields are valid, proceed with the update
    const urlCheckId = `https://localhost:7113/api/Employee/Exists/${id}`;
    axios
      .get(urlCheckId)
      .then((response) => {
        if (response.data === true) {
          const updateurl = `https://localhost:7113/api/Employee/${id}`;
  
          const data = {
            id: id,
            name: name,
            gender: gender, // Use gender directly
            address: address,
            phone: phone,
            dob: dob, // Use dob directly
            isActive: isActive === '1' ? 1 : 0,
          };
          console.log('Data to be sent:', data); // Debugging
          axios
            .put(updateurl, data)
            .then((response) => {
              if (response.data === true) {
                // Employee updated successfully
                fetchData();
                clear();
                setShowPopup(false);
                toast.success('Employee details have been updated successfully.');
              } else {
                // Handle the case where the PUT request failed
                setIdErrorMessage('An error occurred while processing your request.');
              }
            })
            .catch((error) => {
              // Handle Axios PUT request error
              console.error(error);
              setIdErrorMessage('An error occurred while processing your request.');
            });
        }
      })
      .catch((error) => {
        // Handle Axios GET request error
        console.error(error);
        setIdErrorMessage('An error occurred while checking employee existence.');
      });
  };
  
  

  // const handleEditUpdate = ({ id, name, gender, address, phone, dob }) => {
  //   console.log('Input values:', id, name, gender, address, phone, dob);
  
  //   // Define validation functions for name, address, gender, and dob
  //   const nameUpdateError = validateUpdateName(name);
  //   const phoneUpdateError = validateUpdatePhone(phone);
  //   const addressUpdateError = validateUpdateAddress(address);
  //   const dateValidationError = validateDate(dob);
  
  //   console.log(
  //     'Validation errors:',
  //     nameUpdateError,
  //     phoneUpdateError,
  //     addressUpdateError,
  //     dateValidationError
  //   );
  
  //   // Check if any validation errors exist
  //   if (
  //     nameUpdateError ||
  //     phoneUpdateError ||
  //     addressUpdateError ||
  //     dateValidationError
  //   ) {
  //     // Display an error message to the user (you can update your UI accordingly)
  //     console.log(
  //       'Validation errors:',
  //       nameUpdateError,
  //       phoneUpdateError,
  //       addressUpdateError,
  //       dateValidationError
  //     );
  
  //     // Handle the case where there are validation errors
  //     // You can update your UI to display the error messages as needed
  //     // For example, you can set state variables to display error messages
  
  //     return; // Don't proceed with the update if there are validation errors
  //   }
  
  //   // If all fields are valid, proceed with the update
  //   const urlCheckId = `https://localhost:7113/api/Employee/Exists/${id}`;
  //   axios
  //     .get(urlCheckId)
  //     .then((response) => {
  //       if (response.data === true) {
  //         const updateurl = `https://localhost:7113/api/Employee/${id}`;
  
  //         const data = {
  //           id: id,
  //           name: name,
  //           gender: selectedRowData.gender, // Use selectedRowData.gender,
  //           address: address,
  //           phone: phone,
  //           dob: dob, // Assuming date is already formatted correctly
  //           isActive: isActive === '1' ? 1 : 0,
  //         };
  //         console.log('Data to be sent:', data); // Debugging
  //         axios
  //           .put(updateurl, data)
  //           .then((response) => {
  //             if (response.data === true) {
  //               // Employee updated successfully
  //               fetchData();
  //               clear();
  //               setShowPopup(false);
  //               toast.success('Employee details have been updated successfully.');
  //             } else {
  //               // Handle the case where the PUT request failed
  //               setIdErrorMessage('An error occurred while processing your request.');
  //             }
  //           })
  //           .catch((error) => {
  //             // Handle Axios PUT request error
  //             console.error(error);
  //             setIdErrorMessage('An error occurred while processing your request.');
  //           });
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle Axios GET request error
  //       console.error(error);
  //       setIdErrorMessage('An error occurred while checking employee existence.');
  //     });
  // };
  
 
  
  const [showGenderColumn, setShowGenderColumn] = useState(true); // Initially, set it to true or false based on your requirement
  
  
  
  return (
    
    <Fragment>
      

      <ToastContainer />
      <Container>
       <h5><center><font color='red'>Enter Employee details:</font></center></h5>
      
        <div>
          <Row>
            <Col>
            <Form.Label><font> <b>ID </b></font><font color='red'>*</font></Form.Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             
              <input
  type="text"  className="highlighted" // Apply the "highlighted" class// Apply the "highlighted" class if isClicked is true
 
  placeholder="Enter ID"
  value={ID}
  onChange={(e) => {
    const inputId = e.target.value;
    SetID(inputId);
    const error = validateId(inputId);
    setIdErrorMessage(error);
    handleInputChange(e); // Call the onChange event handler
  }}
  onBlur={handleBlur} // Call the onBlur event handler
/>
{idErrorMessage && <div className="error-message">{idErrorMessage}</div>}

       </Col>
          </Row>

          {/* <Row>
            <Col>
            <Form.Label><font> <b>Email Id </b></font><font color='red'>*</font></Form.Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             
              <input
  type="text"  className="highlighted" // Apply the "highlighted" class// Apply the "highlighted" class if isClicked is true
 
  placeholder="Enter EmailId"
  value={ID}
  onChange={(e) => {
    const inputId = e.target.value;
    SetID(inputId);
    const error = validateId(inputId);
    setIdErrorMessage(error);
    handleInputChange(e); // Call the onChange event handler
  }}
  onBlur={handleBlur} // Call the onBlur event handler
/>
{idErrorMessage && <div className="error-message">{idErrorMessage}</div>}

       </Col>
          </Row> */}



          <Row>
            <Col>
              <Form.Label><font> <b>Name</b> </font><font color='red'>*</font></Form.Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
              <input
  type="text" className="highlighted" 
  placeholder="Enter Name"
  value={name}
  onChange={(e) => {
    const inputName = e.target.value;
    SetName(inputName);
    const error = validateName(inputName);
        setNameError(error);
    handleInputChange('name', inputName); // Call the onChange event handler
  }}
  onBlur={handleBlur} // Call the onBlur event handler
/>

{nameError && <div className="error-message">{nameError}</div>}

{/* Edit mode input field */}


            </Col>
          </Row>
          <Row>
            <Col>
            <Form.Label><font><b> Contact </b></font><font color='red'>*</font></Form.Label>&nbsp;&nbsp;
             
<input
  type="text" className="highlighted" 
  placeholder="Enter Phone"
  value={phone}
  onChange={(e) => {
    const inputPhone = e.target.value;
    setPhone(inputPhone);
    const error = validatePhone(inputPhone);
    setPhoneError(error);
    handleInputChange(phone,inputPhone); // Call the onChange event handler
  }}
  onBlur={handleBlur} // Call the onBlur event handler
/>
{phoneError && <div className="error-message">{phoneError}</div>}
            </Col>
          </Row>
          
          <Row>
          <Col><Form.Label><b>DOB:</b><font color='red'>*</font></Form.Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <DatePicker className="highlighted" 
    selected={selectedDate}
    onChange={(date) => {
      setSelectedDate(date);
      handleInputChange('dob', date); // Pass the name 'dob' and the date value
    }}
    onBlur={handleBlur}
    dateFormat="dd/MM/yyyy"
    isClearable
    placeholderText="Select DOB"
  />
</Col>
         </Row>
         <Row>
          <Col>
          <Form.Label><b>Address:</b><font color='red'>*</font></Form.Label>&nbsp;
         <input
  type="text" className="highlighted" 
  placeholder="Enter Address"
  value={address}
  onChange={(e) => {
    const inputAddress = e.target.value;
    setAddress(inputAddress.trim());
    handleInputChange(e); // Call the onChange event handler
  }}
  onBlur={handleBlur} // Call the onBlur event handler
/>
</Col>
</Row>

          <Row>
            <Col >
            
              <Form.Label><b>Gender:<font color='red'>*</font></b></Form.Label>&nbsp;&nbsp;
             
<select
  value={gender} className="highlighted" 
  onChange={(e) => {
    const inputGender = e.target.value; // Corrected variable name
    setGender(inputGender); // Corrected function name
    //const error = validateGender(inputGender);
    //setGenderError(error);
    handleInputChange('gender', inputGender); // Call the onChange event handler with the field name 'gender'
  }}
  onBlur={handleBlur} // Call the onBlur event handler
>
  {/* Options */}
  
  <option value="" disabled>
    Select Gender
  </option>

  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
              {genderError && <div className="error-message">{genderError}</div>}
            </Col>
          </Row>
          <Col>
          </Col>
          <Row>
            <Col>
              <button className="btn btn-primary" onClick={handleSave} disabled={!isFormValid}> 
                Submit
              </button>
            </Col>
            <Col>
              <div className="search-container">
                <label>Search by Name: </label>&nbsp;
                <img src="/images/serachimg.jpg" alt="Search" className="search-image" />
                <input
        type="text" className="highlighted" 
        placeholder="Search by Name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
              </div>
            </Col> 
          </Row>
        </div>  
         
        <div className="table-container">
          <div className="table-header">
            {noDataAvailable ? (
            <div className="error-message" style={{ color: 'red' }}>
              No data available.
            </div>
          )  : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Original Gender</th>
                    <th>DOB</th>
                    
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
  {data && pageData.length > 0 ? (
    pageData
      .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((item, index) => {
        const dob = item.dob
          ? formatDateForTextBox(item.dob) // Format the date here
          : 'N/A';

        return (
          <tr key={index} className="table-row">
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.gender}</td>
            <td>{dob}</td>
            {showGenderColumn && (
              <td>
                {item.gender.trim() === 'Male' ? (
                  <img src="/images/Male.jpg" alt="Male" className="gender-image" />
                ) : item.gender.trim() === 'Female' ? (
                  <img src="/images/Female.jpg" alt="Female" className="gender-image" />
                ) : (
                  'Other'
                )}
              </td>
            )}
            <td>{item.address}</td>
            <td>{item.phone}</td>
            <td>
              <button onClick={() => { clear(); handleEditClick(item); }}>Edit</button>&nbsp;&nbsp;
           
              <button className="btn btn-danger" onClick={() => handleDeleteClick(item.id, item.name)}>Delete</button>
            </td>
          </tr>
        );
      })
  ) : (
  
  <tr>
  
      <td colSpan="7">{'No data found.'}</td>
    </tr>
    
  )
  
  }
</tbody>
            </Table>
           )}
          
      </div>
      <div className = ' d-flex justify-content-end'>

      <Pagination>
      <Pagination.Prev onClick={handlePrevious} disabled={page === 1} />
{Array.from({ length: pageCount }, (_, index) => (
  // Only render the page number if it's within the range of available pages
  // pageCount represents the total number of pages with records
  (index + 1 <= pageCount) && (
    <Pagination.Item
      key={index + 1}
      active={page === index + 1}
      onClick={() => setPage(index + 1)}
    >
      {index + 1}
    </Pagination.Item>
  )
))}
<Pagination.Next onClick={handleNext} disabled={page === pageCount} />
</Pagination>


      </div>
    <div>
      {/* Other JSX code */}
      
      {/* Conditionally render the popup */}
      {showPopup && (
        <div className="popup">
          {/*Display the selectedRowData */}
          <h3><font color="green"><center>Edit Employee Details</center></font></h3>
          <form>
          <label>
         {/* <p>ID: {selectedRowData.id}</p> */}
              ID:
              <input
                type="text" className="highlighted" 
                name="id"
                value={selectedRowData.id} 
                onChange={(e) => setSelectedRowData({  ...selectedRowData, id: e.target.value })}
              />
              </label>
            <br/>
              <br />
              {/*  <p>Name: {selectedRowData.name}</p>*/}
            <label><font><b>
              Name:</b></font><font color='red'>*</font>
              </label>
 <input
    type="text" 
    name="name" className="highlighted" 
    value={selectedRowData.name}
    onChange={(e) => {
      const newUpdateName = e.target.value;
      setSelectedRowData({ ...selectedRowData, name: newUpdateName });

      // Validate the name input and update the error message
      const nameUpdateError = validateUpdateName(newUpdateName);
      console.log('Name update name:', newUpdateName);
      setNameUpdateError(nameUpdateError); // Assuming you have a state variable nameUpdateError to store the error message
      
      // Enable or disable the update button based on validation and field completeness
      setIsUpdateButtonDisabled(!nameUpdateError || !allFieldsFilled);
    }}
  />
  {/* Display the error message */}
  {Boolean(nameUpdateError) && <div className="error-message">{nameUpdateError}</div>}

<label> <font><b>Phone:</b></font><font color='red'>*</font> </label>
<input
  type="text"
  name="phone" className="highlighted" 
  value={selectedRowData.phone}
  onChange={(e) => {
    const input = e.target.value;
    // Use a regular expression to remove non-numeric characters
    const numericValue = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    setSelectedRowData({ ...selectedRowData, phone: numericValue });

    // Validate the name input and update the error message
    const phoneUpdateError = validateUpdatePhone(numericValue);

    // Enable or disable the update button based on validation and field completeness
    setIsUpdateButtonDisabled(!phoneUpdateError || !allFieldsFilled);
  }}
/>
  {/* Display the error message */}
  {Boolean(phoneUpdateError) && <div className="error-message">{phoneUpdateError}</div>}

{/* <label>
  Phone:
  <input
    type="text"
    name="phone"
    value={selectedRowData.phone}
    onChange={(e) => {
      const newUpdatePhone = e.target.value;

      // Validate the phone input and update the error message
      const phoneUpdateError = validateUpdatePhone(newUpdatePhone);
      console.log('Phone update phone:', newUpdatePhone);
      setPhoneUpdateError(phoneUpdateError); // Assuming you have a state variable phoneUpdateError to store the error message

      // Enable or disable the update button based on validation and field completeness
      setIsUpdateButtonDisabled(!phoneUpdateError || !allFieldsFilled);
    }}
  
  {/* Display the error message *
  {Boolean(phoneUpdateError) && <div className="error-message">{phoneUpdateError}</div>}*/}


{/*const genderOptions = ["Male", "Female", "Other"]; // Define your gender options*/}


<label><b>Gender:</b></label>
{/* <select
  value={selectedRowData.gender}
  onChange={(e) => {
    const selectedGender = e.target.value;
    setSelectedRowData({
      ...selectedRowData,
      gender: selectedGender,
    });
  }}
>
  <option value="" disabled>
    Select Gender
  </option>
  {genderOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select> */}
<select className="highlighted" 
        value={selectedRowData.gender}
        onChange={(e) => {
          const newGender = e.target.value;
          setSelectedRowData((prevData) => ({
            ...prevData,
            gender: newGender,
          }));
        }}
      >
        <option value="" disabled>
    Select Gender
  </option>
  

  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

        <br/>
          {/*Address */}
          <label>
              <font><b>Address:</b></font><font color='red'>*</font>
              <input className="highlighted" 
  type="text"
  name="address"
  value={selectedRowData.address || ''}
  onChange={(e) => {
    const newUpdateAddress = e.target.value.trim().replace(/\s+/g, ' ');
    console.log('New Address:', newUpdateAddress);
    
    setSelectedRowData({ ...selectedRowData, address: newUpdateAddress });

    // Validate the address input and update the error message
    const addressUpdateError = validateUpdateAddress(newUpdateAddress);
    console.log('Address Update Error:', addressUpdateError);
    
    setAddressUpdateError(addressUpdateError);
    
    // Update the address field in selectedRowData only if it's valid
    if (!addressUpdateError) {
      setSelectedRowData({
        ...selectedRowData,
        address: newUpdateAddress,
      });
    }
    
    // Calculate 'isAddressValid' based on address validation
    const isAddressValid = !addressUpdateError;

    // En
    
    setIsUpdateButtonDisabled(!isAddressValid || !allFieldsFilled);
  }}
/>

{/* Display the error message */}
{Boolean(addressUpdateError) && <div className="error-message">{addressUpdateError}</div>}

            </label>

          <label><font>DOB:</font><font color='red'>*</font></label>         
          <DatePicker className="highlighted" 
  selected={
    selectedRowData.dob
      ? new Date(selectedRowData.dob.split("/").reverse().join("-")) // Convert to yyyy-MM-dd format
      : null
  
  }
  onChange={(date) => {
    console.log('Datepicker selected date:', date);
    if (date === null) {
      const dateValidationError = 'Please select a valid date of birth.';
      setDateValidationError(dateValidationError);
    } else {

    // Validate the selected date
    const formattedDate = date ? formatDateForTextBox(date) : 'N/A';
    const dateValidationError = validateDate(formattedDate);
    setDateValidationError(dateValidationError);

    // Update the selected date only if it's valid
    if (!dateValidationError) {
      setSelectedRowData({
        ...selectedRowData,
        dob: formattedDate,
      });
    }
  }
  }}
  dateFormat="dd/MM/yyyy"
  isClearable
  placeholderText="Select DOB"
/>

{Boolean(dateValidationError) && <div className="error-message">{dateValidationError}</div>}

          <button disabled={areAnyFieldsEmptyOrDeleted()} onClick={handleUpdateClick}>Update</button>

          {/*<button onClick={handleClosePopup}>Cancel</button>*/}
          <button onClick={() => {  clearErrors(); handleClosePopup();}}>Cancel</button>
          </form>
        </div>
      )}
      
    </div>
 
          </div>
    
  

        <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Add your confirmation message here */}i
    Are you sure you want to delete this employee?{employeeNameToDelete}
  </Modal.Body>
  <Modal.Footer>
    {/* Add the Delete and Cancel buttons */}
    <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleDeleteConfirm}>
      Delete
    </Button>
  </Modal.Footer>

</Modal>
      </Container>
    </Fragment>
  );
};

export default CRUD;
