from .agent import farm_insights_agent

def getFarmInsights(lat:float,lng:float,language:str):
    res = farm_insights_agent(lat=lat,lng=lng,language=language)
    return res

