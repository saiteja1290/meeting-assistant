import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables from .env file in the root directory
load_dotenv()

# Retrieve the GROQ_API value from environment variables
api_key = os.getenv('GROQ_API')

# Initialize the Groq client with the API key
client = Groq(api_key=api_key)
def transcribe_audio(filename):
    with open(filename, "rb") as file:
        transcription = client.audio.transcriptions.create(
            file=(filename, file.read()),  # Required audio file
            model="distil-whisper-large-v3-en",  # Model to use for transcription
            prompt="Specify context or spelling",  # Optional
            response_format="json",  # Optional
            language="en",  # Optional
            temperature=0.0  # Optional
        )
        return transcription.text