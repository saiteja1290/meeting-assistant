import os
import base64
import time
import datetime
from email.mime.text import MIMEText  # Add this import
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


# If modifying these SCOPES, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly', 
          'https://www.googleapis.com/auth/gmail.send']

# Path to token.json and credentials.json
TOKEN_PATH = 'token.json'
CREDENTIALS_PATH = 'creds.json'
def get_active_google_meetings(calendar_service):
    """Get events from Google Calendar and return active Google Meet meetings."""
    now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    events_result = calendar_service.events().list(
        calendarId='primary', timeMin=now, maxResults=10, singleEvents=True,
        orderBy='startTime').execute()
    events = events_result.get('items', [])
    
    active_meetings = []
    
    for event in events:
        if 'hangoutLink' in event:
            start_time = event['start'].get('dateTime', event['start'].get('date'))
            meeting_details = {
                'summary': event.get('summary'),
                'start_time': start_time,
                'meet_link': event['hangoutLink']
            }
            active_meetings.append(meeting_details)
    
    return active_meetings