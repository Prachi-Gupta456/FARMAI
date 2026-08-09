import pandas as pd
import json

df = pd.read_csv("SCHEME_AGENT/updated_data.csv")

df = df.drop(columns=["Unnamed: 9"])
df["application"] = df["application"].fillna("Not specified — check official portal")
df["documents"] = df["documents"].fillna("Not specified — check official portal")
df["tags"] = df["tags"].fillna("")

agri_df = df[df["schemeCategory"].str.contains("Agri", case=False, na=False)]
print(agri_df.shape)

print(agri_df["level"].value_counts())

def scheme_to_text(row):
    return f"""
    Scheme Name: {row['scheme_name']}
    Level: {row['level']}
    Category: {row['schemeCategory']}
    Details: {row['details']}
    Eligibility: {row['eligibility']}
    Benefits: {row['benefits']}
    Application Process: {row['application']}
    Documents Required: {row['documents']}
    Tags: {row['tags']}"""

texts = agri_df.apply(scheme_to_text, axis=1).tolist()

metadatas = agri_df[["scheme_name", "level", "schemeCategory", "slug"]].to_dict("records")

with open("SCHEME_AGENT/metadatas.json","w",encoding="utf-8") as f:
    json.dump(metadatas,f,ensure_ascii=False,indent=2)

with open("SCHEME_AGENT/texts.json", "w", encoding="utf-8") as f:
    json.dump(texts, f, ensure_ascii=False, indent=2)