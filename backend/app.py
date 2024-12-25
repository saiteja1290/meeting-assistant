import os
import numpy as np
from record import record_audio
from transribe import transcribe_audio
from authenticate import authenticate_google_account
from gmeet import get_active_google_meetings
from sentiment import sentiment_analyser
from flask import Flask, jsonify
from tempfile import mktemp

app = Flask(__name__)

@app.route('/api/record_audio', methods=['GET'])
def record_audio_route():
    try:
        # Generate a temporary file for storing the audio
        temp_audio_file = mktemp(suffix=".wav", dir="temp_audio")
        os.makedirs(os.path.dirname(temp_audio_file), exist_ok=True)

        # Record audio for 5 seconds (can be adjusted)
        record_audio(temp_audio_file, duration=5)

        # Transcribe the recorded audio
        transcription_text = transcribe_audio(temp_audio_file)
        sentiment = sentiment_analyser(transcription_text)

        # Return the transcription result along with the audio file path
        return jsonify({"status": "success", "file": temp_audio_file, "transcription": transcription_text + " " + sentiment})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
@app.route('/api/get_meetings', methods=['GET'])
def get_meetings():
    try:
        # Authenticate with Google APIs
        calendar_service, _ = authenticate_google_account()

        # Fetch active Google Meet meetings
        active_meetings = get_active_google_meetings(calendar_service)

        if active_meetings:
            return jsonify({"status": "success", "meetings": active_meetings})
        else:
            return jsonify({"status": "success", "meetings": []})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
