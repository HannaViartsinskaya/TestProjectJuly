import {Given, Then, When} from 'cypress-cucumber-preprocessor/steps';
import {BasePage} from './pageObjects/BasePage';
import {constants} from '../constants';

var productNameOriginal='';

Given(/^I go to OWASP main page$/, function () {
    cy.visit('');
});

Given(/^I close welcome banner$/, () => {
    cy.get(BasePage.welcomeBannerDismissBtn).click();
});
Given(/^I select the second page in pagination$/, () => {
    cy.get(".item-name").first().invoke('text').then((text) => {
        productNameOriginal=text;
        cy.log("1st Product name on the 1st page "+productNameOriginal);
    });
//     cy.scrollTo('bottom');
    cy.get(BasePage.nextPageBtn).click();
    cy.wait(1000);
});

Given(/^I click on Accept all cookies button$/,  () => {
    cy.get(BasePage.cookiesBtn).click();
});

Given(/^I see first product is not the same as it was on the first page$/,  () => {
    cy.get(".item-name").first().invoke('text').then((text) => {
        cy.log("1st Product name on the 2nd page "+text);
        expect(text).to.not.equal(productNameOriginal);
        });
});

Given(/^I select 24 items per page$/,  () => {
    cy.get(BasePage.selectorItemsPerPage).click();
    cy.get(BasePage.option24ElementsPerPage).click();
});

Then(/^I see 24 products per page$/,  () => {
    cy.get(".item-name").should("have.length",24);
});

Given(/^I change language to Deutsch$/,  () => {
    cy.get(BasePage.languageIcon).click();
    cy.get(BasePage.languageDeutschOption).click({force:true});
});

Then(/^I see language was changed succesfully$/,  () => {
    cy.get('[class="ng-star-inserted"]')
      .eq(1)
      .contains("Alle Produkte")
      .should("exist")
// open menu
    cy.get(BasePage.menuIcon).click();
     cy.get(BasePage.firstMenuElement)
          .contains("Anmelden")
          .should("exist")
     cy.get(BasePage.secondMenuPoint)
       .contains("Kundenfeedback")
       .should("exist")
     cy.get(BasePage.thirdMenuPoint)
            .contains("Über uns")
            .should("exist")
     cy.get(BasePage.fourthMenuPoint)
                 .contains("Foto-Wand")
                 .should("exist")
     cy.get(BasePage.fifthMenuPoint)
                 .contains("Punkteübersicht")
                 .should("exist")
});

Given(/^I go to Login page$/,  () => {
    cy.visit('/#/login');
});

Given(/^I enter username "([^"]*)" and password "([^"]*)"$/,  (email, password) => {
     cy.get('[name="email"]').type(email);
     cy.get('[name="password"]').type(password);
     cy.get('[aria-label="Login"]').click();
});

Then(/^I see user "([^"]*)" was succesfully loged in$/,  (email) => {
    cy.get(BasePage.menuIcon).click();
    cy.get('[aria-label="Go to user profile"]')
    .contains(email)
    .should("exist")
    cy.get('[aria-label="Logout"]')
        .should("exist")
});

Then(/^I see the message "([^"]*)"$/,  (message) => {
    cy.contains(message);
});

Then(/^I login as "([^"]*)" with pwd "([^"]*)" and I see that request body for login does not contain password as a plain text$/,  (email, password) => {
        cy.visit('/#/login');
        cy.intercept('/rest/user/login').as('login')
         cy.get('[name="email"]').type(email);
         cy.get('[name="password"]').type(password);
         cy.get('[aria-label="Login"]').click();
         cy.wait('@login').then((interception) => {
             cy.log("Password in request "+ interception.request.body.password);
             expect(interception.request.body.password).not.to.equal(password);
         })
});