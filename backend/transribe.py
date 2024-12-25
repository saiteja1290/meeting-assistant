from groq import Groq
client = Groq(api_key="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")
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