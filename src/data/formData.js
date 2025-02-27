const fieldsData = [
  {
    label: "Field Name",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "fieldName",
    options: null,
    placeholder: "Enter Field Name",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: 10,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Email Address",
    isFieldVisible: true,
    value: "",
    type: "email",
    name: "email",
    options: null,
    placeholder: "Enter your email",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: 50,
    regexType: "email",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Password",
    isFieldVisible: true,
    value: "",
    type: "password",
    name: "password",
    options: null,
    placeholder: "Enter your password",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: 20,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Phone Number",
    isFieldVisible: true,
    value: "",
    type: "tel",
    name: "phoneNumber",
    options: null,
    placeholder: "Enter your phone number",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: 10,
    regexType: "phone",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Date of Birth",
    isFieldVisible: true,
    value: "",
    type: "date",
    name: "dob",
    options: null,
    placeholder: "Select your date of birth",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: null,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Address",
    isFieldVisible: true,
    value: "",
    type: "textarea",
    name: "address",
    options: null,
    placeholder: "Enter your address",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: 200,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Select Option",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "selectOption",
    mode: "tag",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    placeholder: "Select an option",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: null,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Mul Select Option",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "multipleSelectOption",
    mode: "multiple",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    placeholder: "Select an option",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: null,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Checkbox",
    isFieldVisible: true,
    value: false,
    type: "checkbox",
    name: "checkboxField",
    options: null,
    placeholder: "",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: null,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "Agree to terms",
  },
  {
    label: "Radio Button",
    isFieldVisible: true,
    value: "option1",
    type: "radio",
    name: "radioButtonField",
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
    ],
    placeholder: "",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: 0,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "File Upload",
    isFieldVisible: true,
    value: "",
    type: "file",
    name: "fileUpload",
    options: null,
    placeholder: "Choose a file",
    isMandatory: false,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: null,
    regexType: null,
    hasFeedback: false,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Range Slider",
    isFieldVisible: true,
    value: 50,
    type: "range",
    name: "rangeSlider",
    options: null,
    placeholder: "",
    isMandatory: false,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: null,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "Adjust the value",
  },
  {
    label: "Time",
    isFieldVisible: true,
    value: "",
    type: "time",
    name: "timeField",
    options: null,
    placeholder: "Select a time",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: 5,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "DateTime",
    isFieldVisible: true,
    value: "",
    type: "datetime-local",
    name: "datetimeField",
    options: null,
    placeholder: "Select a date and time",
    isMandatory: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: null,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
];

export default fieldsData;

export const registerFormData = [
  {
    label: "Register Number",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "Register_Number",
    options: null,
    placeholder: "Enter your Register Number",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 20,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },

  {
    label: "Present Course",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "PresentCourse",
    options: null,
    placeholder: "Enter your Present Course",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 10,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
    isDependentOnOtherColumn: true,
    DependentColumnName: "PresentSem",
  },
  {
    label: "Present Semester",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "PresentSem",
    options: null,
    placeholder: "Enter your Present Semester",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 10,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },

  {
    label: "First Name",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "FirstName",
    options: null,
    placeholder: "Enter your First Name",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 50,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Middle Name",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "MiddleName",
    options: null,
    placeholder: "Enter your Middle Name",
    isMandatory: false,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 50,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Last Name",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "LastName",
    options: null,
    placeholder: "Enter your Last Name",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 50,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Full Name",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "FullName",
    options: null,
    placeholder: "Enter your Full Name",
    isMandatory: false,
    isDisabled: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 100,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Email",
    isFieldVisible: true,
    value: "",
    type: "email",
    name: "email",
    options: null,
    placeholder: "Enter your Email",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 50,
    regexType: "email",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Mobile Number",
    isFieldVisible: true,
    value: "",
    type: "tel",
    name: "MobileNo",
    options: null,
    placeholder: "Enter your Mobile Number",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 15,
    regexType: "mobile",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Gender",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "Gender",
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Other", label: "Other" },
    ],
    placeholder: "Select Gender",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 50,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Date Of Birth",
    isFieldVisible: true,
    value: "",
    type: "date",
    name: "DateOfBirth",
    options: [],
    placeholder: "",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 50,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },

  {
    label: "Password",
    isFieldVisible: true,
    value: "",
    type: "password",
    name: "Password",
    options: null,
    placeholder: "Enter your Password",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 50,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },

  {
    label: "Country",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "country",
    options: [],
    placeholder: "Select your Country",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 50,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
    isDependentOnOtherColumn: true,
    DependentColumnName: "State",
  },
  {
    label: "State",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "State",
    options: [],
    placeholder: "Select your State",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 50,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
    isDependentOnOtherColumn: true,
    DependentColumnName: "City",
  },
  {
    label: "City",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "City",
    options: [],
    placeholder: "Select your City",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 50,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "PinCode",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "PinCode",
    options: null,
    placeholder: "Enter your PinCode",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 10,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },

  {
    label: "CurrentAddress",
    isFieldVisible: true,
    value: "",
    type: "textarea",
    name: "CurrentAddress",
    options: null,
    placeholder: "Enter your Current Address",
    isMandatory: true,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 200,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Permanent Address",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "PermanentAddress",
    options: null,
    placeholder: "Enter your Permanent Address",
    isMandatory: false,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 200,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },

  {
    label: "isActive",
    isFieldVisible: true,
    value: true,
    type: "checkbox",
    name: "isActive",
    options: null,
    placeholder: "",
    isMandatory: false,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 10,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "isPortalDisable",
    isFieldVisible: true,
    value: true,
    type: "checkbox",
    name: "isPortalDisable",
    options: null,
    placeholder: "",
    isMandatory: false,
    isError: "",
    columnSpace: 6,
    layout: "vertical",
    maxLength: 10,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },

  {
    label: "StudentPhoto",
    isFieldVisible: true,
    value: "",
    type: "file",
    name: "StudentPhoto",
    options: null,
    placeholder: "",
    isMandatory: true,
    isError: "",
    columnSpace: 24,
    layout: "vertical",
    maxLength: 10,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
    multiple: false,
  },
];

export const catagoryFieldsData = [
  // {
  //   label: "Year",
  //   isFieldVisible: true,
  //   mode: "tag",
  //   value: "", // default empty value
  //   type: "select", // dropdown/select for year
  //   name: "year",
  //   options: [
  //     { label: "2020", value: "2020" },
  //     { label: "2021", value: "2021" },
  //     { label: "2022", value: "2022" },
  //     { label: "2023", value: "2023" },
  //     { label: "2024", value: "2024" },
  //   ],
  //   placeholder: "Select a Year",
  //   isMandatory: true,
  //   isDisabled: false,
  //   isError: "",
  //   columnSpace: 4,
  //   layout: "vertical",
  //   maxLength: null,
  //   regexType: "number", // Not necessary here, it's just an example
  //   hasFeedback: true,
  //   validateStatus: "default",
  //   help: "",
  // },
  {
    label: "Course",
    isFieldVisible: true,
    // mode: "tag",
    value: "", // default empty value
    type: "select", // dropdown/select for level
    name: "Course",
    options: [],
    placeholder: "Select  Course",
    isMandatory: true,
    isDisabled: false,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: null,
    regexType: "text", // Only text in this case
    hasFeedback: true,
    validateStatus: "default",
    help: "",
    isDependentOnOtherColumn: true,
    DependentColumnName: "Semester",
  },
  {
    label: "Semester",
    // mode: "multiple",
    isFieldVisible: true,
    value: "", // default empty value
    type: "select", // dropdown/select for category
    name: "Semester",
    options: [],
    placeholder: "Select Semester",
    isMandatory: true,
    isDisabled: false,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: null,
    regexType: "text", // Only text in this case
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
];

export const studentStartAssessmentDetails = [
  {
    label: "Full Name",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "fullName",
    options: null,
    placeholder: "Enter your Full Name",
    isMandatory: false,
    isDisabled: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: 100,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Father Name",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "fatherName",
    options: null,
    placeholder: "Enter your Father Name",
    isMandatory: true,
    isDisabled: false,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: 100,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Mother Name",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "motherName",
    options: null,
    placeholder: "Enter your Mother Name",
    isMandatory: true,
    isDisabled: false,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: 100,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Date Of Birth",
    isFieldVisible: true,
    value: "",
    type: "date",
    name: "dob",
    options: null,
    placeholder: "Enter your Date Of Birth",
    isMandatory: false,
    isDisabled: true,
    isError: "",
    columnSpace: 4,
    layout: "vertical",
    maxLength: 100,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
];

export const adminQuestionsUploadForm = [
  {
    label: "Course",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "Course",
    options: [],
    placeholder: "Select Course",
    isMandatory: true,
    isError: "",
    columnSpace: 8,
    layout: "vertical",
    maxLength: 10,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
    isDependentOnOtherColumn: true,
    DependentColumnName: "Semester",
  },
  {
    label: "Semester",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "Semester",
    options: [],
    placeholder: "Select Semester",
    isMandatory: true,
    isError: "",
    columnSpace: 8,
    layout: "vertical",
    maxLength: 10,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  // {
  //   label: "Subject",
  //   isFieldVisible: true,
  //   value: "",
  //   type: "select",
  //   name: "Subject",
  //   options: [],
  //   placeholder: "Select Subject",
  //   isMandatory: true,
  //   isError: "",
  //   columnSpace: 8,
  //   layout: "vertical",
  //   maxLength: 10,
  //   regexType: "allowAll",
  //   hasFeedback: true,
  //   validateStatus: "default",
  //   help: "",
  // },
];

export const adminOMRQuestionsAndAnswersUploadForm = [
  {
    label: "Course",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "Course",
    options: [],
    placeholder: "Select Course",
    isMandatory: true,
    isError: "",
    columnSpace: 8,
    layout: "vertical",
    maxLength: 10,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
    isDependentOnOtherColumn: true,
    DependentColumnName: "Semester",
  },
  {
    label: "Semester",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "Semester",
    options: [],
    placeholder: "Select Semester",
    isMandatory: true,
    isError: "",
    columnSpace: 8,
    layout: "vertical",
    maxLength: 10,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
    isDependentOnOtherColumn: true,
    DependentColumnName: "Subject",
  },
  {
    label: "Subject",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "Subject",
    options: [],
    placeholder: "Select Subject",
    isMandatory: true,
    isError: "",
    columnSpace: 8,
    layout: "vertical",
    maxLength: 10,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Question",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "Question",
    options: [],
    placeholder: "Enter Your Question",
    isMandatory: true,
    isError: "",
    columnSpace: 24,
    layout: "vertical",
    maxLength: 100,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },

  {
    label: "Option A",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "OptionA",
    options: [],
    placeholder: "Enter Option A",
    isMandatory: true,
    isError: "",
    columnSpace: 12,
    layout: "vertical",
    maxLength: 100,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Option B",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "OptionB",
    options: [],
    placeholder: "Enter Option B",
    isMandatory: true,
    isError: "",
    columnSpace: 12,
    layout: "vertical",
    maxLength: 100,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Option C",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "OptionC",
    options: [],
    placeholder: "Enter Option B",
    isMandatory: true,
    isError: "",
    columnSpace: 12,
    layout: "vertical",
    maxLength: 100,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Option D",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "OptionD",
    options: [],
    placeholder: "Enter Option D",
    isMandatory: true,
    isError: "",
    columnSpace: 12,
    layout: "vertical",
    maxLength: 100,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Correct Answer",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "CorrectOption",
    options: [],
    placeholder: "",
    isMandatory: true,
    isError: "",
    columnSpace: 24,
    layout: "vertical",
    maxLength: 10,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
];

export const uploadCourseFormData = [
  {
    label: "Course Name",
    isFieldVisible: true,
    value: "",
    type: "text",
    name: "courseName",
    options: null,
    placeholder: "Enter Course Name",
    isMandatory: true,
    isError: "",
    columnSpace: 12,
    layout: "vertical",
    maxLength: 50,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Category",
    isFieldVisible: true,
    value: "",
    type: "select",
    name: "category",
    options: [
      { label: "UG", value: "ug" },
      { label: "PG", value: "pg" },
    ],
    placeholder: "Select Category",
    isMandatory: true,
    isError: "",
    columnSpace: 12,
    layout: "vertical",
    maxLength: 50,
    regexType: "onlyText",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Semesters",
    isFieldVisible: true,
    value: "",
    type: "number",
    name: "semesters",
    options: null,
    placeholder: "Enter Semesters",
    isMandatory: true,
    isError: "",
    columnSpace: 12,
    layout: "vertical",
    maxLength: 50,
    regexType: "allowAll",
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
  {
    label: "Is Yearly",
    isFieldVisible: true,
    value: false,
    type: "checkbox",
    name: "isYearly",
    options: null,
    placeholder: "",
    isMandatory: true,
    isError: "",
    columnSpace: 12,
    layout: "vertical",
    maxLength: null,
    regexType: null,
    hasFeedback: true,
    validateStatus: "default",
    help: "",
  },
];
