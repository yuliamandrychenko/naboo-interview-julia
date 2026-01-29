Feature: Manage favorite activities

  Scenario: Add an activity to favorites
    Given a logged-in user
    When the user adds an activity to favorites
    Then the activity is marked as favorite
    And it appears on the user profile
