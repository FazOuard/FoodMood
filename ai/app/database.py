import sqlalchemy as sa
from sqlalchemy import create_engine
import urllib
from dotenv import load_dotenv
import os

load_dotenv()

DB_SERVER = os.getenv('DB_SERVER')
DB_DATABASE = os.getenv('DB_DATABASE')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')

conn_str = urllib.parse.quote_plus(
    f'Driver={{SQL Server}};'  
    f'Server={DB_SERVER};'      
    f'Database={DB_DATABASE};' 
    f'UID={DB_USER};'          
    f'PWD={DB_PASSWORD};'      
    f'Trusted_Connection=no;'  
)

try:
    ApiSQLEngine = create_engine(f'mssql+pyodbc:///?odbc_connect={conn_str}')
    print("Connexion réussie")

except Exception as e:
    print("Échec de la connexion :", e)
