Feature: Basic functionality for OWASP

    Background:
        Given I go to OWASP main page
        And I close welcome banner
        And I click on Accept all cookies button

    Scenario: Pagination functionality does show different items per page
        Given I select the second page in pagination
        Then I see first product is not the same as it was on the first page

    Scenario: Change the amount of items works correctly
        Given I select 24 items per page
        Then I see 24 products per page

    Scenario: User can change the language
        Given I change language to Deutsch
        Then I see language was changed succesfully

    Scenario: User with invalid creds will see appropriate error
        Given I go to Login page
        And I enter username "admin@juice-sh.op" and password "admin"
        Then I see the message "Invalid email or password."

    Scenario: User can succesfully login via admin creds
        Given I go to Login page
        And I enter username "admin@juice-sh.op" and password "admin123"
#        I'm not checking the toasts because they are not present anymore, as a workaround I will check that email is visible and Logout option
        Then I see user "admin@juice-sh.op" was succesfully loged in