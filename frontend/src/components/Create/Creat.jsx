import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import des icônes
import "./Creat.css";
import { nationalities } from "../../../api/NationalityData";
import ImageSelector from "../imageSelector/imageSelector";
import img1 from "../../assets/breakfast/1.png"
import img2 from "../../assets/breakfast/2.png"
import img3 from "../../assets/breakfast/3.png"

const RegistrationForm = () => { 

  const images = [ img1, img2, img3 ]

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    genre: "",
    age: "",
    city: "",
    region: "",
    nationalité: "",
    status: "",
    poids: "",
    taille: "",
    Aimer_Plat_marocain: "",
    type_cuisine: "",
    duree_preparation: "",
    Vegeterien_question: "",
    Allergies: "",
    Allergie_specification: "",
    type_viande_prefere: "",
    Poids_etat: "",
    Sport_question: "",
    sport_pratique: "",
    regime_question: "",
    regime_alimentaire: "",
    regime_raison: "",
    maladie: "",
    dejeuner_preference: "",
    favoriteDishes: [],
    ConsumedDishes: [],
  });

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false); // État pour afficher ou masquer le mot de passe
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // État pour afficher ou masquer le mot de passe de confirmation

  const navigate = useNavigate(); // Hook pour la redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageSelect = (selectedIndex) => {
    setFormData({ ...formData, dejeuner_preference: selectedIndex });
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, step: 1 }), // Envoi des données en JSON
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        setStep(2); // Passer à l'étape suivante
      } else {
        setError(data.error || "Erreur lors de l'inscription.");
      }
    } catch (err) {
      setError("Une erreur est survenue pendant l'inscription.");
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, step: 2 }), // Envoi des données en JSON
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        alert(data.message);
        navigate("/");  // Rediriger vers la page de login après inscription
      } else {
        setError(data.error || "Erreur lors de l'inscription.");
      }
    } catch (err) {
      setError("Une erreur est survenue pendant l'inscription.");
    }
  };
  

  return (
    <div className="containerOfEverything">
    <div className="container">
      <div className="auth-container">
        <div className="auth-card">
          {step === 1 && (
            <>
              <h1>Créer un compte</h1>
              <form onSubmit={handleNextStep}>
                <input
                  type="email"
                  name="username"
                  placeholder="Email"
                  value={formData.username}
                  onChange={handleChange}
                />
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"} // Utiliser l'état pour afficher ou masquer le mot de passe
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)} // Inverser l'état de l'icône
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Afficher ou masquer l'icône */}
                  </span>
                </div>
                <div className="password-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"} // Idem pour la confirmation du mot de passe
                    name="confirmPassword"
                    placeholder="Confirmez le mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Inverser l'état de l'icône pour le mot de passe de confirmation
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <h1> </h1>
                <button type="submit">Suivant</button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <form onSubmit={handleRegister}>
                <div className="form-create-all-0">
              <div className="form-create-all0">
                
              <h1>Informations générales</h1>
                <div className="form-create-all">
                    <div className="form-create-all1">
                        <div className="create-form-one-side">
                            <div className="create-form-one-field">
                                <h5>Genre:</h5>
                                <select
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
                                >
                                    <option value="">Sélectionner votre genre</option>
                                    <option value="femme">Femme</option>
                                    <option value="homme">Homme</option>
                                </select>
                            </div>
                            
                            <div className="create-form-one-field">
                                <h5>Âge:</h5>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Âge"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="create-form-one-side">
                            <div className="create-form-one-field">
                                <h5>Nationalité:</h5>
                                <select
                                    name="nationalité"
                                    value={formData.nationalité}
                                    onChange={handleChange}
                                >
                                    <option value="">Sélectionner votre nationalité</option>
                                    {nationalities.map((nat, index1) => (
                                        <option value={nat}>{nat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="create-form-one-field">
                                <h5>Région:</h5>
                                <select
                                    name="genre"
                                    value={formData.region}
                                    onChange={handleChange}
                                >
                                    <option value="">Sélectionner votre région</option>
                                    <option value="Rabat-Salé-Kenitra">Rabat-Salé-Kenitra</option>
                                    <option value="Fès-Meknès">Fès-Meknès</option>
                                    <option value="Casablanca-Settat">Casablanca-Settat</option>
                                    <option value="Deraa-Tafilalet">Deraa-Tafilalet</option>
                                    <option value="Souss-Massa">Souss-Massa</option>
                                    <option value="Béni Mellal-Khénifra">Béni Mellal-Khénifra</option>
                                    <option value="Oriental">Oriental</option>
                                    <option value="Marrakech-Safi">Marrakech-Safi</option>
                                    <option value="Tanger-Tétouan-Al Hoceima">Tanger-Tétouan-Al Hoceima</option>
                                    <option value="Souss-Massa">Souss-Massa</option>
                                    <option value="Laayoune-Sakia el Hamra">Laayoune-Sakia el Hamra</option>
                                    <option value="Guelmim-Oued Noun">Guelmim-Oued Noun</option>
                                    <option value="Je ne suis pas marocain">Je ne suis pas marocain</option>
                                </select>
                            </div>
                        </div>

                        <div className="create-form-one-side">

                            <div className="create-form-one-field">
                                <h5>Ville:</h5>
                                <input
                                type="text"
                                name="city"
                                placeholder="Ville"
                                value={formData.city}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="create-form-one-field">
                                <h5>Status:</h5>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="">Sélectionner votre status</option>
                                    <option value="Étudiant">Étudiant</option>
                                    <option value="Fonctionnaire">Fonctionnaire</option>
                                    <option value="Retraité">Retraité</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>
                        </div>
                        
                        
                        <div className="create-form-one-side">
                            <div className="create-form-one-side1">
                                <div className="create-form-one-field2">
                                    <h5>Poids:</h5>
                                    <input
                                    type="number"
                                    name="poids"
                                    placeholder="Votre poids"
                                    value={formData.poids}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="create-form-one-field2">
                                    <h5>Taille:</h5>
                                    <input
                                    type="number"
                                    name="taille"
                                    placeholder="Votre taille"
                                    value={formData.taille}
                                    onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="create-form-one-field">
                                <h5>Vous aimez les plats marocains?</h5>
                                <select
                                    name="Aimer_Plat_marocain"
                                    value={formData.Aimer_Plat_marocain}
                                    onChange={handleChange}
                                >
                                    <option value="">Sélectionner votre choix</option>
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>
                                </select>
                            </div>
                        </div>

                        <div className="create-form-one-side">
                            <div className="create-form-one-field">
                                <h5>Votre type de cuisine préférée?</h5>
                                <input
                                type="text"
                                name="type_cuisine"
                                placeholder="Type de cuisine"
                                value={formData.poids}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="create-form-one-field">
                                <h5>Votre durée de préparation idéale?</h5>
                                <select
                                    name="duree_preparation"
                                    value={formData.duree_preparation}
                                    onChange={handleChange}
                                >
                                    <option value="">Sélectionner une durée</option>
                                    <option value="15-30minutes">15 - 30 minutes</option>
                                    <option value="30-60 minutes">30 - 60 minutes</option>
                                    <option value="1-3 heures">1 - 3 heures</option>
                                    <option value="Plus">Plus</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="create-form-one-side">
                        <div className="create-form-one-field">
                        <h5>Plats préférés:</h5>
                            <input
                                type="text"
                                name="favoriteDishes"
                                placeholder="Plats préférés (séparés par des virgules)"
                                value={formData.favoriteDishes}
                                onChange={(e) =>
                                    setFormData({ ...formData, favoriteDishes: e.target.value.split(",") })
                                }
                            />
                        </div>
                        
                        <div className="create-form-one-field">
                        <h5>Plats consommés:</h5>
                            <input
                                type="text"
                                name="ConsumedDishes"
                                placeholder="Plats consommés (séparés par des virgules)"
                                value={formData.ConsumedDishes}
                                onChange={(e) =>
                                    setFormData({ ...formData, ConsumedDishes: e.target.value.split(",") })
                                }
                            />
                        </div>

                        </div>

                    </div>
                    <div className="vertical-line-form-create"/>
                    <div className="form-create-all1">
                      
                      <div className="create-form-one-side-part2">
                        <div className="create-form-one-side-part2-1">
                          <div className="create-form-one-field-part21">
                              <h5>Végétarien(ne)?</h5>
                              <select
                                    name="Vegeterien_question"
                                    value={formData.Vegeterien_question}
                                    onChange={handleChange}
                              >
                                    <option value="">Sélectionner une réponse</option>
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>
                              </select>
                          </div>
                          <div className="create-form-one-field-part21">
                              <h5>Allergique?</h5>
                              <select
                                    name="Allergies"
                                    value={formData.Allergies}
                                    onChange={handleChange}
                                >
                                <option value="">Sélectionner une réponse</option>
                                <option value="Oui">Oui</option>
                                <option value="Non">Non</option>
                              </select>
                          </div>
                        </div>
                        <div className="create-form-one-field0">
                                <h5>Si oui, laquelle?</h5>
                                <input
                                type="text"
                                name="Allergie_specification"
                                placeholder="Votre allergie"
                                value={formData.Allergie_specification}
                                onChange={handleChange}
                                />
                        </div>
                    </div>

                    <div className="create-form-one-side-part2">
                        <div className="create-form-one-side-part2-1">
                          <div className="create-form-one-field-part21">
                              <h5>Vous préférez..</h5>
                              <select
                                    name="type_viande_prefere"
                                    value={formData.type_viande_prefere}
                                    onChange={handleChange}
                              >
                                    <option value="">Sélectionner une réponse</option>
                                    <option value="Poulet">Poulet</option>
                                    <option value="Viande">Viande</option>
                                    <option value="Poisson">Poisson</option>
                              </select>
                          </div>
                          <div className="create-form-one-field-part21">
                              <h5>Vous voulez..</h5>
                              <select
                                    name="Poids_etat"
                                    value={formData.Poids_etat}
                                    onChange={handleChange}
                                >
                                <option value="">Sélectionner une réponse</option>
                                <option value="Perdre du poids">Perdre du poids</option>
                                <option value="Maintenir votre poids">Maintenir votre poids</option>
                                <option value="Gagner du poids">Gagner du poids</option>
                              </select>
                          </div>
                          </div>
                          <div className="create-form-one-side-part2-1">
                          <div className="create-form-one-field-part21">
                              <h5>Sport?</h5>
                              <select
                                    name="Sport_question"
                                    value={formData.Sport_question}
                                    onChange={handleChange}
                              >
                                    <option value="">Sélectionner une réponse</option>
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>
                              </select>
                          </div>
                          <div className="create-form-one-field-part21">
                              <h5>Si oui, lequel?</h5>
                              <input
                                type="text"
                                name="sport_pratique"
                                placeholder="Votre sport"
                                value={formData.sport_pratique}
                                onChange={handleChange}
                              />
                          </div>
                          </div>
                          </div>
                          
                          <div className="create-form-one-side-part2">
                            
                                <div className="create-form-one-field0">
                                    <h5>Un régime?</h5>
                                    <select
                                            name="regime_question"
                                            value={formData.regime_question}
                                            onChange={handleChange}
                                    >
                                            <option value="">Sélectionner une réponse</option>
                                            <option value="Oui">Oui</option>
                                            <option value="Non">Non</option>
                                    </select>
                                </div>
                                
                                <div className="create-form-one-field0">
                                    <h5>Si oui, lequel?</h5>
                                    <input
                                        type="text"
                                        name="regime_alimentaire"
                                        placeholder="Votre régime"
                                        value={formData.regime_alimentaire}
                                        onChange={handleChange}
                                    />
                                </div>

                          </div>
                          
                          <div className="create-form-one-side-part2">
                                
                            <div className="create-form-one-field0">
                            <h5>Si oui, pourquoi?</h5>
                              <input
                                type="text"
                                name="regime_raison"
                                placeholder="Votre raison"
                                value={formData.regime_raison}
                                onChange={handleChange}
                              />
                            </div>
                            
                            <div className="create-form-one-field0">
                            <h5>Une maladie?</h5>
                              <input
                                type="text"
                                name="maladie"
                                placeholder="Votre maladie"
                                value={formData.maladie}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          
                          <div className="create-form-one-side-part2">
                        <div className="create-form-one-field5">
                            <h5>Lequel ressemble le plus à un petit-déjeuner selon vous?</h5>
                            <div style={{ width: "37vw"}}>
                              <ImageSelector images={images} onSelect={handleImageSelect}/>
                            </div>
                        </div>
                        </div>

                    </div>
                    
                    
                </div>
                <button type="submit">S'inscrire</button>
                </div>
                </div>
              </form>
            </>
          )}
          <h1> </h1>

          {error && <p className="error">{error}</p>}
          <Link to="/">Déjà inscrit ? Se connecter</Link>
        
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegistrationForm;