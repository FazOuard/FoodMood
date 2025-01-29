export const addToFavorites = async (userId, platId) => {
    try {
      const response = await fetch("http://localhost:5000/historique", {
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
  
  export const deleteInteraction = async (user_id, plat) => {
    try {
        // Effectuer la requête fetch
        const response = await fetch(`http://localhost:5000/historique/${user_id}/${plat}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, plat }), // Envoyer user_id et plat dans le corps de la requête
        });

        // Vérifier si la réponse est réussie
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erreur inconnue');
        }

        // Lire les données de la réponse
        const data = await response.json();
        console.log('Interaction supprimée avec succès :', data);

        return data; // Retourner les données de succès
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'interaction :', error.message);
        throw error; // Propager l'erreur pour la gérer ailleurs
    }
};
