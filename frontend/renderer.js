const meetingsContainer = document.getElementById('meetingsContainer');
const fetchMeetingsButton = document.getElementById('fetchMeetingsButton');

async function fetchMeetings() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/get_meetings');
        const data = await response.json();

        if (data.status === 'success' && data.meetings.length > 0) {
            meetingsContainer.innerHTML = '';
            data.meetings.forEach((meeting) => {
                const meetingCard = document.createElement('div');
                meetingCard.className =
                    'bg-gray-900 rounded-lg p-6 hover:bg-gray-800 cursor-pointer transition duration-200';

                meetingCard.innerHTML = `
                    <h3 class="text-xl font-bold mb-2">${meeting.summary || 'No Title'}</h3>
                    <p class="text-gray-400 mb-2">Start Time: ${meeting.start_time}</p>
                    <p class="text-blue-400">View Details →</p>
                `;

                meetingCard.addEventListener('click', () => {
                    localStorage.setItem('currentMeeting', JSON.stringify(meeting));
                    window.location.href = 'meeting-details.html';
                });

                meetingsContainer.appendChild(meetingCard);
            });
        } else {
            meetingsContainer.innerHTML = `
                <p class="col-span-full text-center text-gray-400">
                    No active meetings found.
                </p>`;
        }
    } catch (error) {
        meetingsContainer.innerHTML = `
            <p class="col-span-full text-center text-red-400">
                Failed to fetch meetings: ${error.message}
            </p>`;
    }
}

fetchMeetingsButton.addEventListener('click', fetchMeetings);