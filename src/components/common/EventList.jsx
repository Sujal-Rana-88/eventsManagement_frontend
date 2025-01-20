import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API_URLS from '../../config/urls';
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [eventDetails, setEventDetails] = useState({
    summary: "",
    description: "",
  });
  const [selectedDate, setSelectedDate] = useState(null); // Initially null to show all events
  const [eventDate] = useState(new Date()); // Always use the current date and time for event creation
  const [isModalOpen, setIsModalOpen] = useState(false); // For event creation modal visibility
  const email = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  const fetchEvents = async (date) => {
    try {
      const response = await axios.post(API_URLS.FETCH_EVENTS, {
        date: date ? date.toISOString() : null,
        email: email,
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });

      const events = response.data;
      setEvents(events);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch events");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(selectedDate); // Initial event fetch
  }, [selectedDate]);

  const handleEventCreation = async () => {
    try {
      const { summary, description } = eventDetails;
      if (!summary || !description) {
        alert("Please provide both summary and description");
        return;
      }

      const eventPayload = {
        summary,
        description,
        timestamp: eventDate.toISOString(),
        email,
      };

      await axios.post(API_URLS.CREATE_EVENT, eventPayload, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      setEventDetails({ summary: "", description: "" });
      fetchEvents(selectedDate); // Refresh events list
      setIsModalOpen(false); // Close the modal after event creation
    } catch (err) {
      console.error(
        "Error creating event:",
        err.response ? err.response.data : err.message
      );
      setError("Failed to create event");
    }
  };
  return (
    <>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Select a Date to View Events
        </h3>
        <div className="flex flex-col items-center gap-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            className="w-full p-3 border rounded-lg text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => setIsModalOpen(true)} // Open modal to create event
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            Create New Event
          </button>
        </div>
      </div>
      <div className="w-full max-w-2xl mt-10">
        {loading ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-blue-500 text-center mb-6">
              Your Upcoming Events
            </h2>
            <ul className="space-y-4">
              {events
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort events by timestamp
                .map((event, index) => (
                  <li
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md border"
                  >
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {event.summary}
                    </h4>
                    <p className="text-gray-600">{event.description}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-center mb-4">
              Create a New Event
            </h3>
            <input
              type="text"
              placeholder="Event Summary"
              value={eventDetails.summary}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, summary: e.target.value })
              }
              className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Event Description"
              value={eventDetails.description}
              onChange={(e) =>
                setEventDetails({
                  ...eventDetails,
                  description: e.target.value,
                })
              }
              className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400 h-28"
            />
            <button
              onClick={handleEventCreation}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
              Create Event
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 mt-3"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventList;


// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import API_URLS from '../../config/urls';
// import axios from "axios";
// import { auth } from '../auth/firebase';  // Import from your firebaseConfig.js file
// import { getAuth } from 'firebase/auth';

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [eventDetails, setEventDetails] = useState({
//     summary: "",
//     description: "",
//   });
//   const [selectedDate, setSelectedDate] = useState(null); // Initially null to show all events
//   const [eventDate] = useState(new Date()); // Always use the current date and time for event creation
//   const [isModalOpen, setIsModalOpen] = useState(false); // For event creation modal visibility
//   const email = localStorage.getItem("userEmail");

//   const fetchEvents = async (date) => {
//     try {
//       const user = auth.currentUser;  // Use the 'auth' imported from firebaseConfig
  
//       if (!user) {
//         throw new Error("User is not authenticated.");
//       }
  
//       const idToken = await user.getIdToken();  // Get the Firebase ID token
//       console.log(idToken);
  
//       const response = await axios.post(API_URLS.FETCH_EVENTS, {
//         date: date ? date.toISOString() : null,
//         email: email,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${idToken}`,  // Attach the token here
//           'Content-Type': 'application/json',
//         }
//       });
  
//       setEvents(response.data);
//       setLoading(false);
      
//     } catch (err) {
//       console.error('Error fetching events:', err);
//       setError("Failed to fetch events");
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     fetchEvents(selectedDate); // Initial event fetch
//   }, [selectedDate]);

//   const handleEventCreation = async () => {
//     try {
//       const { summary, description } = eventDetails;
//       if (!summary || !description) {
//         alert("Please provide both summary and description");
//         return;
//       }
  
//       // Get the current authenticated user
//       const user = await user.getIdToken(); 
//       if (!user) {
//         throw new Error("User is not authenticated.");
//       }
  
//       const idToken = await user.getIdToken();  // Get the Firebase ID token
  
//       const eventPayload = {
//         summary,
//         description,
//         timestamp: eventDate.toISOString(),
//         email,
//       };
  
//       // Send the token with the event creation request
//       await axios.post(API_URLS.CREATE_EVENT, eventPayload, {
//         headers: {
//           'Authorization': `Bearer ${idToken}`,  // Attach the token to the request
//           'Content-Type': 'application/json',     // Ensure you're sending JSON data
//         }
//       });
  
//       setEventDetails({ summary: "", description: "" });
//       fetchEvents(selectedDate); // Refresh events list
//       setIsModalOpen(false); // Close the modal after event creation
//     } catch (err) {
//       console.error(
//         "Error creating event:",
//         err.response ? err.response.data : err.message
//       );
//       setError("Failed to create event");
//     }
//   };
  
//   return (
//     <>
//       <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
//         <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
//           Select a Date to View Events
//         </h3>
//         <div className="flex flex-col items-center gap-4">
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => setSelectedDate(date)}
//             dateFormat="MMMM d, yyyy"
//             className="w-full p-3 border rounded-lg text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={() => setIsModalOpen(true)} // Open modal to create event
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
//           >
//             Create New Event
//           </button>
//         </div>
//       </div>
//       <div className="w-full max-w-2xl mt-10">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading events...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : (
//           <div>
//             <h2 className="text-2xl font-bold text-blue-500 text-center mb-6">
//               Your Upcoming Events
//             </h2>
//             <ul className="space-y-4">
//               {events
//                 .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort events by timestamp
//                 .map((event, index) => (
//                   <li
//                     key={index}
//                     className="bg-white p-4 rounded-lg shadow-md border"
//                   >
//                     <h4 className="font-semibold text-gray-800 text-lg">
//                       {event.summary}
//                     </h4>
//                     <p className="text-gray-600">{event.description}</p>
//                     <p className="text-gray-500 text-sm mt-1">
//                       {new Date(event.timestamp).toLocaleString()}
//                     </p>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         )}
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-bold text-center mb-4">
//               Create a New Event
//             </h3>
//             <input
//               type="text"
//               placeholder="Event Summary"
//               value={eventDetails.summary}
//               onChange={(e) =>
//                 setEventDetails({ ...eventDetails, summary: e.target.value })
//               }
//               className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             />
//             <textarea
//               placeholder="Event Description"
//               value={eventDetails.description}
//               onChange={(e) =>
//                 setEventDetails({
//                   ...eventDetails,
//                   description: e.target.value,
//                 })
//               }
//               className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400 h-28"
//             />
//             <button
//               onClick={handleEventCreation}
//               className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
//             >
//               Create Event
//             </button>
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="w-full bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 mt-3"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EventList;
