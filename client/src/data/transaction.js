import ToPhoto from "../assets/To.png";
import FromPhoto from "../assets/From.png";

const transactions = [
    { id: 1, type: "From", name: "Mazen", amount: "+5000", currency: "EGP", date: "28/11/2022", status: "Success", icon: FromPhoto ,number:"9182918291829"},
    { id: 2, type: "To", name: "Talabat", amount: "-500", currency: "EGP", date: "28/11/2024", status: "Success", icon: ToPhoto ,number:"9182918291829"},
    { id: 3, type: "From", name: "Maya", amount: "+5000", currency: "EGP", date: "28/11/2024", status: "Pending", icon: FromPhoto ,number:"9182918291829"},
    { id: 4, type: "To", name: "Talabat", amount: "-500", currency: "EGP", date: "28/11/2024", status: "Pending", icon: ToPhoto ,number:"9182918291829"},
    { id: 5, type: "From", name: "Maya", amount: "+5000", currency: "EGP", date: "28/11/2024", status: "Success", icon: FromPhoto ,number:"9182918291829"},
    { id: 6, type: "To", name: "Talabat", amount: "-500", currency: "EGP", date: "28/11/2024", status: "Pending", icon: ToPhoto ,number:"9182918291829"},
    
];

export default transactions;