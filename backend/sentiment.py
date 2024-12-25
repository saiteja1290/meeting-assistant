
from groq import Groq
client = Groq(api_key="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")
def sentiment_analyser(text):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Conversation: {text}. What is the sentiment of the conversation above? (ANSWER WITH ONLY 'POSITIVE', 'NEGATIVE', 'NEUTRAL')",
            }
        ],
        model="llama3-8b-8192",  # Replace with the appropriate model name if needed
    )
    
    # Extract the response from the API and return the sentiment
    sentiment = chat_completion.choices[0].message.content.strip()
    return sentiment
