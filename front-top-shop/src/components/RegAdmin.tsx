import React, { useState } from "react";
import TShirtForm from "./TShirtForm";
import TablaRegistros from "./Tabla";

const TShirtManagement: React.FC = () => {
  const [refreshTable, setRefreshTable] = useState(false);

  const handleSaveSuccess = () => {
    setRefreshTable((prev) => !prev);
  };

  return (
    <div>
      <TShirtForm onSaveSuccess={handleSaveSuccess} />
      <TablaRegistros refresh={refreshTable} />
    </div>
  );
};

export default TShirtManagement;
