import Chance from 'chance';
const chance = new Chance();

describe('Klibus', () => {
    const email = chance.email();
    const username = chance.word({length: 7});
    const pass = 'bimbamboum';
    const time = 2000;
    const dogbreed = chance.integer({min:0, max:171});
    const catbreed = chance.integer({min:0, max:96});
    const n = chance.integer({min:0, max:10});

    it('registers', () => {
        cy.visit('http://localhost:3000/');

        cy.contains('Register').click();
        cy.url().should('include', 'register');

        cy.get('input[name="username"]').type(username);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(pass);
        cy.get('input[name="confirm"]').type(pass);
        
        cy.get('button[type="submit"]').click();

        //cy.should('contain', 'Registered Successfully');
        
    });

    it('adds a dog posting', () => {
        //Log in
        cy.contains('Log in').click();
        cy.wait(time);
        
        cy.url().should('include', 'login');

        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(pass);
        cy.get('button[type="submit"]').click();

        //cy.should('contain', 'Connected Successfully');
        cy.contains('Go home').click();
        cy.wait(time);

        //Adds the posting
        cy.contains('Add a post').click();
        cy.wait(time);
        cy.url().should('include', 'post');

        cy.get('input[name="title"]').type(chance.sentence({words: 5}));
        cy.get('select[name="animal"]').select('Dog');
        cy.get('select[name="breed"]').select(dogbreed);
        cy.get('select[name="category"]').select(chance.integer({min:0, max:1}));
        cy.get('input[type="file"]').attachFile(`./pictures/dogs/dogs_${n}.jpg`);

        cy.get('textarea').type(chance.paragraph());
        cy.get('button[type="submit"]').click();
        cy.wait(time);

        
    });

    it('adds a cat posting', () => {
        //Log in
        cy.contains('Go home').click();
        cy.contains('Log In').click();
        
        cy.wait(time);
        
        cy.url().should('include', 'login');

        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(pass);
        cy.contains('Login').click();

        //cy.should('contain', 'Connected Successfully');
        cy.contains('Go home').click();
        cy.wait(time);

        //Adds the posting
        cy.contains('Add a post').click();
        cy.wait(time);
        cy.url().should('include', 'post');

        cy.get('input[name="title"]').type(chance.sentence({words: 5}));
        cy.get('select[name="animal"]').select('Cat');
        cy.get('select[name="breed"]').select(catbreed);
        cy.get('select[name="category"]').select(chance.integer({min:0, max:1}));
        cy.get('input[type="file"]').attachFile(`./pictures/cats/cats_${n}.jpg`);

        cy.get('textarea').type(chance.paragraph());
        cy.get('button[type="submit"]').click();
        cy.wait(time);

        cy.contains('Go home').click();
    });

    
})