from flask import Flask,render_template,request,jsonify,abort
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler,OrdinalEncoder,OneHotEncoder
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer
import matplotlib.pyplot as plt
from flask_cors import CORS


app=Flask(__name__)
#Bootstrap(app)
CORS(app)

data=pd.read_csv('Préférences_Alimentaires.csv')
plat=pd.read_csv("Plats.csv")


#Preprocessing plats preferees
data = data.dropna(subset=["Plat_consome"])
vectorizer=TfidfVectorizer()
X=vectorizer.fit_transform(data["Plat_consome"])


#normalize numerical features
data["Taille "] = data["Taille "].str.replace(',', '.').astype(float)

input_numerical=["Âge","Poids ","Taille "]
input_cathegorical=["Statut","Nationalité ", "Région ","type_cuisine", "Poids_etat", "duree_preparation"]
input_binary=["Genre","Aimer_Plat_marocain","Sport_question","regime_question"]

input_cath=input_cathegorical+input_binary

ordinal_encoder = OrdinalEncoder()
data_encoded = ordinal_encoder.fit_transform(data[input_cath])

# Standardize numerical features
standard = StandardScaler()
X_numerical = standard.fit_transform(data[input_numerical])
X_combined = np.hstack((X_numerical, data_encoded))

knn = NearestNeighbors(n_neighbors=10, metric="euclidean")
knn.fit(X_combined)

def recommendations_preferee(input):

  categorical_features = data.select_dtypes(include=['object']).columns.tolist()
  input_cath = [input[i] for i in range(0,10) if (type(input[i]) == str and input[i] in categorical_features) or (type(input[i]) == int and str(input[i]) in categorical_features)]

  ordinal_encoder = OrdinalEncoder()
  data_encoded = ordinal_encoder.fit_transform(data[categorical_features])

  numerical_features_indices = [0, 5, 6]
  input_numerical_features = [input[i] for i in numerical_features_indices]
  input_features_scaled=standard.transform([input_numerical_features])


  input_features_transformed=vectorizer.transform([input[10]])


  input_features_transformed_limited = input_features_transformed.toarray()[:, :10]

  input_combined=np.hstack((input_features_scaled, input_features_transformed_limited))
  distances,indices=knn.kneighbors(input_combined)

  recommendations=data.iloc[indices[0]]
  return recommendations[["Plat_prefere"]]

def recommendations_preferee_list(input):

  categorical_features = data.select_dtypes(include=['object']).columns.tolist()
  input_cath = [input[i] for i in range(0,10) if (type(input[i]) == str and input[i] in categorical_features) or (type(input[i]) == int and str(input[i]) in categorical_features)]

  ordinal_encoder = OrdinalEncoder()
  data_encoded = ordinal_encoder.fit_transform(data[categorical_features])

  numerical_features_indices = [0, 5, 6]
  input_numerical_features = [input[i] for i in numerical_features_indices]
  input_features_scaled=standard.transform([input_numerical_features])


  input_features_transformed=vectorizer.transform([input[10]])


  input_features_transformed_limited = input_features_transformed.toarray()[:, :10]

  input_combined=np.hstack((input_features_scaled, input_features_transformed_limited))
  distances,indices=knn.kneighbors(input_combined)


  recommendations_df = recommendations_preferee(input)

  plat_prefere_list = []

  for plat in recommendations_df["Plat_prefere"]:
      plat_prefere_list.extend(plat.split(", "))
  plat_prefere_list = list(set(plat_prefere_list))
  return plat_prefere_list

  

def food_recommended_output(input):
    recommendations = recommendations_preferee_list(input)
    plat_resultat = []
    duree_preparation=input[7]
    for i in recommendations:
        plat_info = plat[plat["Titre"] == i]
        if not plat_info.empty:
            for _, row in plat_info.iterrows():  
                if row["Duree de preparation"] != duree_preparation:
                    print(f"Le plat {row['Titre']} est ignoré en raison de la durée ({row['Duree de preparation']} != {duree_preparation})")
                    continue
                if pd.isna(row["Image"]) or pd.isna(row["Recette"]):  
                    print(f"Invalid entry skipped: {row['Titre']}")
                    continue
                
                
                plat_resultat.append({
                    "Titre": row["Titre"],
                    "Image": row["Image"],
                    "Recette": row["Recette"]
                })
        else:
            print(f"Aucune recette trouvée pour {i}")
    
    print("Recommandations :", plat_resultat)
    return plat_resultat







@app.route('/recommendation',methods=['GET','POST'])
def index():
    
    try:
        
        Âge = float(request.form.get('Âge', 0))  
        Genre = request.form.get('Genre', "Unknown")
        Statut = request.form.get('Statut', "Unknown")
        Aimer_Plat_marocain = request.form.get('Aimer_Plat_marocain', "No")
        type_cuisine = request.form.get('type_cuisine', "Unknown")
        Poids = float(request.form.get('Poids ', 0))  
        Taille = float(request.form.get('Taille ', 0)) 
        duree_preparation = request.form.get('duree_preparation', "Unknown")
        Sport_question = request.form.get('Sport_question', "No")
        regime_question = request.form.get('regime_question', "No")
        Plat_consome = request.form.get('Plat_consome', "Unknown")
    except ValueError as e:
        print(f"ValueError: {e}")
        abort(400, description="Invalid input data")
    
    input_features = [
        Âge, Genre, Statut, Aimer_Plat_marocain, type_cuisine,
        Poids, Taille, duree_preparation, Sport_question,
        regime_question, Plat_consome
    ]
    
    recommendations = food_recommended_output(input_features)
    if not isinstance(recommendations, (list, dict)):
        abort(500, description="Invalid recommendations format")
    return jsonify({'recommendations': recommendations})

if __name__=='__main__':
    app.run(debug=True)