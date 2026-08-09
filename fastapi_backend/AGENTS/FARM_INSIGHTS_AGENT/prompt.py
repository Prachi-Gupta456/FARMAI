from langchain_core.prompts import PromptTemplate

prompt = PromptTemplate(
    input_variables=[
        "weather",
        "language",
    ],
    template="""
You are an experienced Indian agriculture expert.

Weather:
{weather}

Respond completely in:
{language}

Instructions

1. Analyze the weather carefully.

2. Generate practical farm insights for today.

3. Give advice that is directly based on the weather.

4. Keep the advice short, useful, and easy for farmers to understand.

5. Avoid generic recommendations.

6. Summary:
Write one short sentence describing today's farming conditions.

7. Insights:
Return EXACTLY FOUR short actionable insights.

"""
)