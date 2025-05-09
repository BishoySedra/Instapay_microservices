const userCredentials = [
  {
    id: "e1",
    name: "Mazen Raafat",
    email: "mazenraafat@gmail.com",
    password: "123",
    phone: "01028918120",
    address: "Masr al gdeeda, Cairo",
    role: "user", // Normal user role
    bankAccounts: ["mazenraafat@bank.com", "mazenwork@bank.com"],
    transactions: [
      {
        id: "t1",
        type: { direction: "from", entity: "Employer" }, // Adjusted type
        amount: "+ 5,000",
        currency: "EGP",
        date: "28/11/2024",
        status: "Success",
        number: "23123123213131",
      },
      {
        id: "t2",
        type: { direction: "to", entity: "Talabat" }, // Adjusted type
        amount: "- 500",
        currency: "EGP",
        date: "29/11/2024",
        status: "Pending",
        number: "3212312131231",
      },
    ],
  },
  {
    id: "e2",
    name: "Mayer Soliman",
    email: "mayersoliman@gmail.com",
    password: "456",
    phone: "01234567890",
    address: "Ramses, Cairo",
    role: "user", // Normal user role
    bankAccounts: ["mayersoliman@bank.com"],
    transactions: [
      {
        id: "t3",
        type: { direction: "from", entity: "Ahmed" }, // Adjusted type
        amount: "+ 2,000",
        currency: "EGP",
        date: "25/11/2024",
        status: "Success",
        number: "123812098123",
      },
      {
        id: "t4",
        type: { direction: "to", entity: "Restaurant" }, // Adjusted type
        amount: "- 300",
        currency: "EGP",
        date: "27/11/2024",
        status: "Success",
        number: "11111111111",
      },
    ],
  },
  {
    id: "e3",
    name: "Mazen Mostafa",
    email: "mazenmostafa@gmail.com",
    password: "789",
    phone: "01231212312",
    address: "Madinet Nasr, Cairo",
    role: "user",  // Normal user role
    bankAccounts: ["mazenmostafa@bank.com"],
    transactions: [
      {
        id: "t5",
        type: "from",
        amount: "+ 3,000",
        currency: "EGP",
        date: "30/11/2024",
        status: "Success",
        from: "Client",
        number: "2222222",

      },
      {
        id: "t6",
        type: "to",
        amount: "- 1,000",
        currency: "EGP",
        date: "01/12/2024",
        status: "Pending",
        to: "Car Service Center",
        number: "5556565656",
      },
    ],
  },
  {
    id: "e4",
    name: "Maya Mohamed",
    email: "mayamohamed@gmail.com",
    password: "111",
    phone: "01231237890",
    address: "Madinet Nasr, Cairo",
    role: "user",  // Normal user role
    bankAccounts: ["mayamohamed@bank.com"],
    transactions: [
      {
        id: "t7",
        type: "from",
        amount: "+ 1,500",
        currency: "EGP",
        date: "02/12/2024",
        status: "Success",
        from: "Friend",
        number: "11111111111",

      },
      {
        id: "t8",
        type: "to",
        amount: "- 800",
        currency: "EGP",
        date: "03/12/2024",
        status: "Success",
        to: "E-commerce Website",
        number: "11111111111",

      },
    ],
  },
  {
    id: "e5",
    name: "Farah Moataz",
    email: "farahmoaataz@gmail.com",
    password: "222",
    phone: "01234567890",
    address: "Madinet Nasr, Cairo",
    role: "user",  // Normal user role
    bankAccounts: ["farahmoaataz@bank.com"],
    transactions: [
      {
        id: "t9",
        type: "from",
        amount: "+ 4,000",
        currency: "EGP",
        date: "04/12/2024",
        status: "Success",
        from: "Employer",
        number: "11111111111",

      },
      {
        id: "t10",
        type: "to",
        amount: "- 1,200",
        currency: "EGP",
        date: "05/12/2024",
        status: "Pending",
        to: "Travel Agency",
        number: "11111111111",

      },
    ],
  },
  {
    id: "e6",
    name: "Bishoy Sedra",
    email: "bishoysedra@gmail.com",
    password: "55555",
    phone: "012312312312890",
    address: "3ezbt el nakhl, Cairo",
    role: "user",  // Normal user role
    bankAccounts: ["bishoysedra@bank.com"],
    transactions: [
      {
        id: "t11",
        type: "from",
        amount: "+ 6,000",
        currency: "EGP",
        date: "06/12/2024",
        status: "Success",
        from: "Client",
        number: "6666342324234",

      },
      {
        id: "t12",
        type: "to",
        amount: "- 1,500",
        currency: "EGP",
        date: "07/12/2024",
        status: "Pending",
        to: "Electronics Store",
        number: "6666666",

      },
    ],
  },
  // Admin Users
  {
    id: "e7",
    name: "Admin One",
    email: "adminone@domain.com",
    password: "admin123",
    phone: "01012345678",
    address: "Admin Office, Cairo",
    role: "admin",  // Admin user role
    bankAccounts: ["adminone@bank.com"],
    transactions: [],
  },
  {
    id: "e8",
    name: "Admin Two",
    email: "admintwo@domain.com",
    password: "admin456",
    phone: "01087654321",
    address: "Admin Office, Cairo",
    role: "admin",  // Admin user role
    bankAccounts: ["admintwo@bank.com"],
    transactions: [],
  },
];

export default userCredentials;
