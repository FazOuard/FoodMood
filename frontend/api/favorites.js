export const addToFavorites = async (userId, platId) => {
    try {
      const response = await fetch("http://localhost:8080/historique", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, plat: platId }),  // Assure-toi que les noms des clés correspondent
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout aux favoris.");
      }
      console.log("Plat ajouté aux favoris avec succès !");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };
  