Feature: Show/Hide Event Details
  Scenario: An event element is collapsed by default.
    Given the user opens the app
    When the user is viewing a list of events
    Then the event details should be hidden.

  Scenario: User can expand an event to see details.
    Given a user is viewing an event with collapsed details
    When the user clicks on the collapsed event
    Then the event should expand to show the event details.

  Scenario: User can collapse an event to hide details.
    Given a user is viewing an event with expanded details
    When the user clicks on the hide details button
    Then I should see the event should collapse to hide the event details.