Feature: Specify Number of Events
  Scenario: Default number of events when user hasn't specified a number
    Given the user opens the app
    When the user hasn't specified the number of events
    Then 32 events should be displayed by default.

  Scenario: User changes the number of events displayed
    Given the user is viewing the events list
    When the user specifies the number of events displayed
    Then the events list should update to show the specified number of events.