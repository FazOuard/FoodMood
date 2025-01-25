import React from "react";

const ManageUsers = () => {
  const powerBILink = "https://app.powerbi.com/reportEmbed?reportId=10bbaba9-6186-4733-8aa1-f2d2e8c50d4e&autoAuth=true&ctid=dcd8a5a9-f5c7-43a9-83fa-df572a5184a0";

  return (

      <div
        style={{
          height: "100vh", // Prend toute la hauteur de la fenêtre
          width: "100vw",  // Prend toute la largeur de la fenêtre
          margin: "0",
          padding: "0",
          overflow: "hidden", // Évite les barres de défilement
        }}
      >
        <iframe
          title="Power BI Dashboard"
          src={powerBILink}
          style={{
            border: "none",
            width: "100%",
            height: "100%",
          }}
          allowFullScreen
        ></iframe>
      </div>
    );
  };
export default ManageUsers;
