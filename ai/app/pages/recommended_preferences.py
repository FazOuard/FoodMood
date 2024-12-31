# Mount Google Drive
from google.colab import drive
drive.mount('/content/drive')

# Import necessary libraries
import pandas as pd
import numpy as np
from surprise import Dataset, Reader
from surprise import SVD, SVDpp, KNNWithMeans
from surprise.model_selection import cross_validate, GridSearchCV, train_test_split
from surprise import accuracy

# Load data from Google Drive
plat = pd.read_csv("/content/drive/My Drive/Plats.csv")
transformed_preferences = pd.read_csv('/content/drive/My Drive/transformed_preferences.csv')

transformed_preferences2 = transformed_preferences.copy()

itemCoding, userCoding = {}, {}
for i, row in transformed_preferences.iterrows(): # Use iterrows() to iterate through rows
    itemCoding[row["product_id"]] = i # Access values using row["column_name"]
    userCoding[row["user_id"]] = i
transformed_preferences["product_id"] = transformed_preferences["product_id"].map(itemCoding)