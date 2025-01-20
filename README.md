# Event Management System

## Overview
The Event Management System allows users to create, view, and manage events through a web interface. It supports Google-based login, displays events on a calendar, and provides a modal to create new events. The application uses Firebase for authentication and a backend built with Node.js for storing and fetching events.

## Features
- **Google Login**: Users can authenticate using their Google account.
- **Event Creation**: Users can create new events by entering a summary and description.
- **View Events**: Users can view upcoming events sorted by timestamp.
- **Calendar View**: Select a date to filter and view events on a specific day.

## Technologies Used
- **Frontend**: React, React Router, Axios
- **Authentication**: Firebase Authentication
- **Backend**: Node.js, Express.js
- **Styling**: Tailwind CSS
- **Database**: Firebase (via backend)

## Setup

### 1. Clone the Repository
bash
git clone https://github.com/yourusername/events-management.git
cd events-management
### 2. Install Dependencies

- **cd eventsManagement_frontend**
- npm install

- ## Run Frontend
- npm start

##  API Endpoints
- POST /create-user: Create a new user (used for login with Google).
- POST /events: Fetch events based on the provided date and user email.
- POST /events/create: Create a new event with a summary and description.
