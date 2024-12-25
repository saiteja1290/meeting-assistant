document.addEventListener('DOMContentLoaded', () => {
    const meeting = JSON.parse(localStorage.getItem('currentMeeting'));
    if (!meeting) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('meetingTitle').textContent = meeting.summary || 'No Title';
    document.getElementById('meetingTime').textContent = `Start Time: ${meeting.start_time}`;
    const meetingLink = document.getElementById('meetingLink');
    meetingLink.href = meeting.meet_link;
    meetingLink.textContent = 'Join Meeting';

    // Recording functionality
    const recordAudioButton = document.getElementById('recordAudioButton');
    const audioStatusElement = document.getElementById('audioStatus');
    const audioFileElement = document.getElementById('audioFile');
    const transcriptionElement = document.getElementById('transcription');

    let isRecording = false;
    let recordingInterval;

    recordAudioButton.addEventListener('click', () => {
        if (!isRecording) {
            isRecording = true;
            recordAudioButton.innerText = 'Stop Recording';
            recordAudioButton.classList.remove('bg-white', 'hover:bg-gray-200');
            recordAudioButton.classList.add('bg-red-500', 'hover:bg-red-600');
            transcriptionElement.innerHTML = '';
            audioStatusElement.innerText = '$ Starting recording...';

            recordAndTranscribe();
            recordingInterval = setInterval(recordAndTranscribe, 5000);
        } else {
            isRecording = false;
            recordAudioButton.innerText = 'Start Recording';
            recordAudioButton.classList.remove('bg-red-500', 'hover:bg-red-600');
            recordAudioButton.classList.add('bg-white', 'hover:bg-gray-200');
            audioStatusElement.innerText = '$ Recording stopped';
            clearInterval(recordingInterval);
        }
    });

    async function recordAndTranscribe() {
        try {
            audioStatusElement.innerText = '$ Recording audio...';

            const response = await fetch('http://127.0.0.1:5000/api/record_audio');
            const data = await response.json();

            if (data.status === 'success') {
                audioStatusElement.innerText = '$ Recording complete';
                audioFileElement.innerText = `$ File: ${data.file}`;
                transcriptionElement.innerHTML += `> ${data.transcription}\n\n`;
            } else {
                audioStatusElement.innerText = '$ Error: Recording failed';
                audioFileElement.innerText = `$ ${data.message}`;
            }
        } catch (error) {
            audioStatusElement.innerText = '$ Error: Connection failed';
            audioFileElement.innerText = `$ ${error.message}`;
        }
    }
});
