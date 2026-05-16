import pandas as pd
import psycopg2
from psycopg2.extras import execute_batch

conn = psycopg2.connect(
    host="ep-misty-darkness-aq324rix-pooler.c-8.us-east-1.aws.neon.tech",
    database="neondb",
    user="neondb_owner",
    password="npg_zELK7QpDrHt4",
    sslmode="require"
)

cursor = conn.cursor()

df = pd.read_excel(
    r"C:\Users\91905\Downloads\all-india-villages-master-list-excel\dataset\Rdir_2011_28_ANDHRA_PRADESH.xls"
)

records = []

for index, row in df.iterrows():

    records.append((
        str(row.iloc[0]),
        str(row.iloc[1]),
        str(row.iloc[3]),
        str(row.iloc[5]),
        str(row.iloc[7])
    ))

execute_batch(
    cursor,
    """
    INSERT INTO villages (
        state_code,
        state_name,
        district_name,
        subdistrict_name,
        village_name
    )
    VALUES (%s, %s, %s, %s, %s)
    """,
    records,
    page_size=1000
)

conn.commit()

print("Full dataset imported successfully")