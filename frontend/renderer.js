const meetingsContainer = document.getElementById('meetingsContainer');
const recordAudioButton = document.getElementById('recordAudioButton');
const fetchMeetingsButton = document.getElementById('fetchMeetingsButton');
const audioStatusElement = document.getElementById('audioStatus');
const audioFileElement = document.getElementById('audioFile');
const transcriptionElement = document.getElementById('transcription');

// Function to fetch and display meetings
async function fetchMeetings() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/get_meetings');
        const data = await response.json();

        if (data.status === 'success' && data.meetings.length > 0) {
            meetingsContainer.innerHTML = ''; // Clear the "Loading..." message
            data.meetings.forEach((meeting, index) => {
                const meetingCard = document.createElement('div');
                meetingCard.className =
                    'bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200';

                meetingCard.innerHTML = `
                    <h3 class="text-lg font-bold text-gray-800">${meeting.summary || 'No Title'}</h3>
                    <p class="text-gray-600">Start Time: ${meeting.start_time}</p>
                    <a href="${meeting.meet_link}" 
                       class="text-blue-500 hover:underline mt-2 inline-block" 
                       target="_blank">Join Meeting</a>
                    <button id="startRecordingButton${index}" 
                            class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Start Recording
                    </button>
                `;
                meetingsContainer.appendChild(meetingCard);

                // Attach click event to the recording button
                document
                    .getElementById(`startRecordingButton${index}`)
                    .addEventListener('click', () => showRecordingButton());
            });
        } else {
            meetingsContainer.innerHTML = `
                <p class="col-span-full text-center text-gray-500">
                    No active Google Meet meetings found.
                </p>`;
        }
    } catch (error) {
        meetingsContainer.innerHTML = `
            <p class="col-span-full text-center text-red-500">
                Failed to fetch meetings. ${error.message}
            </p>`;
    }
}

// Function to show the "Start Recording" button
function showRecordingButton() {
    recordAudioButton.style.display = 'block';
}

// Function to start or stop continuous recording
let isRecording = false;
let recordingInterval;

recordAudioButton.addEventListener('click', () => {
    if (!isRecording) {
        isRecording = true;
        recordAudioButton.innerText = 'Stop Recording';
        transcriptionElement.innerHTML = ''; // Clear previous transcriptions
        audioStatusElement.innerText = 'Starting continuous recording...';

        // Start the recording loop (every 5 seconds)
        recordAndTranscribe(); // Trigger the first recording immediately
        recordingInterval = setInterval(recordAndTranscribe, 5000);
    } else {
        isRecording = false;
        recordAudioButton.innerText = 'Start Recording';
        audioStatusElement.innerText = 'Recording stopped.';
        clearInterval(recordingInterval); // Stop the recording loop
    }
});

// Function to record audio and send for transcription
async function recordAndTranscribe() {
    try {
        audioStatusElement.innerText = 'Recording audio...';

        // Send request to Python backend to record audio and transcribe it
        const response = await fetch('http://127.0.0.1:5000/api/record_audio');
        const data = await response.json();

        if (data.status === 'success') {
            audioStatusElement.innerText = 'Recording complete!';
            audioFileElement.innerText = `Audio saved to: ${data.file}`;
            transcriptionElement.innerHTML += `<p>${data.transcription}</p>`;
        } else {
            audioStatusElement.innerText = 'Failed to record or transcribe audio.';
            audioFileElement.innerText = data.message;
        }
    } catch (error) {
        audioStatusElement.innerText = 'Failed to connect to backend.';
        audioFileElement.innerText = error.message;
    }
}

// Fetch meetings when the user clicks the "Fetch Meetings" button
fetchMeetingsButton.addEventListener('click', fetchMeetings);
