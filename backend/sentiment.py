
import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables from .env file in the root directory
load_dotenv()

# Retrieve the GROQ_API value from environment variables
api_key = os.getenv('GROQ_API')

# Initialize the Groq client with the API key
client = Groq(api_key=api_key)
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
