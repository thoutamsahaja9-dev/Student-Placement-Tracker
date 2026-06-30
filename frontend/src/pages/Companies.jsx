import { useEffect, useState } from "react";
import {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} from "../api/companyApi";

import CompanyForm from "../components/CompanyForm";
import CompanyTable from "../components/CompanyTable";

function Companies() {
  const [companies, setCompanies] = useState([]);

  const [company, setCompany] = useState({
    company_name: "",
    role: "",
    package: "",
    eligibility_cgpa: "",
    drive_date: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const data = await getCompanies();
    setCompanies(data);
  };

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateCompany(editingId, company);
      setEditingId(null);
    } else {
      await addCompany(company);
    }

    loadCompanies();

    setCompany({
      company_name: "",
      role: "",
      package: "",
      eligibility_cgpa: "",
      drive_date: "",
    });
  };

  const handleEdit = (companyData) => {
    setCompany(companyData);
    setEditingId(companyData.company_id);
  };

  const handleDelete = async (id) => {
    await deleteCompany(id);
    loadCompanies();
  };

  return (
    <div>
      <CompanyForm
        company={company}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

      <CompanyTable
        companies={companies}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Companies;