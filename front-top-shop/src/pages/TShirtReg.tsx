import React, { useState } from "react";
import TShirtForm from "../components/TShirtForm";
import TablaRegistros from "../components/Tabla";

const TShirt: React.FC = () => {
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

export default TShirt;
