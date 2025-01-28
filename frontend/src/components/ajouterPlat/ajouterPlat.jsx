import "./ajouterPlat.css";

function AjouterPlatt() {
    return (
        <div className="all-ajout">
            <h1>Ajouter un plat</h1>
            <div className="ajout-form">
                <form className="form-container">
                    <div className="form-group">
                        <label>Titre :</label>
                        <input type="text" name="titre" />
                    </div>
                    <div className="form-group">
                        <label>Cuisine :</label>
                        <select name="cuisine">
                            <option value="">Sélectionner une cuisine</option>
                            <option value="marocaine">Marocaine</option>
                            <option value="italienne">Italienne</option>
                            <option value="française">Française</option>
                            <option value="asiatique">Asiatique</option>
                            <option value="mexicaine">Mexicaine</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Catégorie :</label>
                        <select name="categorie">
                            <option value="">Sélectionner une catégorie</option>
                            <option value="entrée">Entrée</option>
                            <option value="plat_principal">Plat principal</option>
                            <option value="dessert">Dessert</option>
                            <option value="boisson">Boisson</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Durée de préparation :</label>
                        <select name="duree_preparation">
                            <option value="">Sélectionner une durée</option>
                            <option value="15">15 min</option>
                            <option value="30">30 min</option>
                            <option value="45">45 min</option>
                            <option value="60">1 heure</option>
                            <option value="plus">Plus d'une heure</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Calories :</label>
                        <input type="number" name="calories" />
                    </div>
                    <div className="form-group">
                        <label>Protéines (g) :</label>
                        <input type="number" name="proteines" />
                    </div>
                    <div className="form-group">
                        <label>Lipides (g) :</label>
                        <input type="number" name="lipides" />
                    </div>
                    <div className="form-group">
                        <label>Glucides (g) :</label>
                        <input type="number" name="glucides" />
                    </div>
                    <div className="form-group">
                        <label>Image :</label>
                        <input type="file" name="image" accept="image/*" />
                    </div>
                    <div className="form-group">
                        <label>Ingrédients :</label>
                        <textarea name="ingredients"></textarea>
                    </div>
                    <div className="form-group">
                        <label>Recette :</label>
                        <textarea name="recette"></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Envoyer</button>
                </form>
            </div>
        </div>
    );
}

export default AjouterPlatt;
