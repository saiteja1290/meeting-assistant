

## Table of Contents
- [Clone Repository](#clone-repository)
- [Setting Up Backend](#setting-up-backend)
- [Setting Up Frontend/Electron](#setting-up-frontendelectron)
- [Running the Application](#running-the-application)

## Clone Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/saiteja1290/meeting-assistant.git
cd meeting-assistant
```

## Setting Up Backend

### 1. Navigate to the `backend` directory:

```bash
cd backend
```

### 2. Get `creds.json` from Google Cloud API

- Go to [Google Cloud Console](https://console.cloud.google.com/).
- Create a project or select an existing one.
- Navigate to **API & Services** > **Credentials**.
- Create OAuth 2.0 credentials for the app.
- Download the `credentials.json` file.

Make sure you enable the following APIs for the project:
- **Gmail API**
- **Google Calendar API**
- **Google Meet API**

Additionally, ensure that testers are allowed access to the API.

### 3. Set Up Virtual Environment

- **Install virtualenv** (if not already installed):

```bash
pip install virtualenv
```

- **Create and activate a virtual environment:**

```bash
# Create a virtual environment (you can name it 'venv' or any name you prefer)
virtualenv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 4. Install Backend Dependencies

Once the virtual environment is activated, install the necessary dependencies:

```bash
pip install -r requirements.txt
```

## Setting Up Frontend/Electron

### 1. Navigate to the `frontend` directory:

```bash
cd frontend
```

### 2. Install Frontend Dependencies

Install the required packages for the Electron frontend:

```bash
npm install
```

## Running the Application

### 1. Start the Backend

Navigate to the `backend` directory and start the Python application:

```bash
cd backend
python app.py
```

### 2. Start the Frontend (Electron)

Navigate to the `frontend` directory and start the Electron app:

```bash
cd frontend
npm start
```

Your application should now be running and accessible for use.

## Troubleshooting

- If you face any issues with Google API credentials, ensure that the necessary APIs are enabled and that your `creds.json` file is correctly placed in the `backend` folder.
- If you encounter any issues with the virtual environment, try deactivating and reactivating it using `deactivate` and then `source venv/bin/activate` (for macOS/Linux) or `venv\Scripts\activate` (for Windows).
- Ensure that the required dependencies are installed without any version conflicts.
