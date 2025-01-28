import "./ajouterPlat.css";



function AjouterPlatt() {
    return (
        <div className="all-ajout">
        <h1>
            Ajouter un plat
        </h1>
        <div className="ajout-form" >
        <form className="form-container">
          <div className="form-group">
            <label>Titre :</label>
            <input type="text" name="nom" />
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input type="email" name="email" />
          </div>
          <div className="form-group">
            <label>Téléphone :</label>
            <input type="tel" name="telephone" />
          </div>
          <div className="form-group">
            <label>Adresse :</label>        
            <input type="text" name="adresse" />
          </div>
          <button type="submit" className="submit-btn">Envoyer</button>
        </form>
        </div>
        </div>
      );
}

export default AjouterPlatt;
