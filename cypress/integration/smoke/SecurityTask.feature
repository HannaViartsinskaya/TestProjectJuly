Feature: Basic functionality for OWASP

    Background:
        Given I go to OWASP main page
        And I close welcome banner
        And I click on Accept all cookies button

    Scenario: Password should not be passed as a plain text in request body
        Then I login as "admin@juice-sh.op" with pwd "admin" and I see that request body for login does not contain password as a plain text
