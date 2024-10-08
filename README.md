# MeetApp

## Project Overview:

A serverless, progressive web application with React, created with a test-driven development technique using a Google Calendar API to fetch upcoming events.

## Feature 1 - Filter Events By City:

### User Story:

As a user,
I should be able to filter events by city
So that I can see a list of events taking place in that city.

### Scenario 1:

Given a user hasn't searched for any city
When the user opens the app
Then the user should see a list of upcoming events from all cities.

### Scenario 2:

Given the main page is open
When the user starts typing in the city textbox
Then the user should receive a list of cities (suggestions) that match what they've typed.

### Scenario 3: 

Given the user has typed in a city in the search bar and the list of suggested cities is showing
When they click on a city from the suggested list
Then events for the selected city should be displayed.

## Feature 2 - Show/Hide Event Details:

### User Story:

As a user,
I should be able to show/hide event details
So that I show/hide additional details about an event.

### Scenario 1:

Given a user is viewing a list of events
When said user opens the app
Then the event details should be hidden.

### Scenario 2:

Given a user is viewing an event with collapsed details
When the user clicks on the collapsed event
Then the event should expand to show the event details.

### Scenario 3:

Given a user is viewing an event with expanded details
When the user clicks on the expanded event
Then the event should collapse to hide the event details.

## Feature 3 - Specify Number of Events:

### User Story:

As a user,
I should be able to specify the number of events displayed
So that I can view the specific number of events I want.

### Scenario 1: 

Given the user hasn't specified the number of events
When the user opens the app
Then 32 events should be displayed by default.

### Scenario 2:

Given the user is viewing the events list
When the user specifies the number of events to be displayed
Then the events list should update to show the specified number of events.

## Feature 4 - Use the App When Offline:

### User Story:

As a user,
I should be able to use the app when offline
So that I can access event information without an internet connection.

### Scenario 1:

Given the user has accessed the app before and has cached data
When the user open the app without an internet connection
Then the app should display cached event data.

### Scenario 2:

Given the user has access the app before, has cached data, and the user has changed search settings (city, number of events)
When the user opens the app without an internet connection
Then the app should display an error message indicating the users device has no internet connection.

## Feature 5 - Add an App Shortcut to the Home Screen

### User Story:

As a user,
I should be able to add a shortcut of the app to my homescreen
So that I can easily access the app.

### Scenario 1:

Given I am a user
When I create an app shortcut to the homescreen
Then a shortcut to the app should be added to my devices home screen.

## Feature 6 - Display Charts Visualizing Event Details:

### User Story:

As a user,
I should be able to display charts visualizing event details
So that I can easily see the number of upcoming events in each city.

### Scenario 1:

Given the user is viewing the events list
When the user clicks the display charts button
Then a chart should be displayed showing the number of upcoming events in each city.