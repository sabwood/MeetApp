Feature: Filter events by city
  Scenario: When user hasn't searched for a city, show upcoming events from all cities.
    Given a user hasn't searched for any city
    When the user opens the app
    Then the user should see a list of upcoming events from all cities.

  Scenario: User should see a list of suggestions when they search for a city.
    Given the main page is open
    When the user starts typing in the city textbox
    Then the user should receive a list of cities (suggestions) that match what they've typed.

  Scenario: User can select a city from the suggested list.
    Given the user has typed in a city in the searchbar
    And the list of suggested cities is showing
    When they click on a city from the suggested list
    Then events for the selected city should be displayed.