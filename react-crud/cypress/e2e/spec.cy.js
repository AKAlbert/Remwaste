describe('React CRUD App', () => {
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('shows error for invalid credentials', () => {
    cy.get('input[placeholder="Username"]').type('wronguser');
    cy.get('input[placeholder="Password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('logs in with valid credentials', () => {
    cy.get('input[placeholder="Username"]').clear().type('admin');
    cy.get('input[placeholder="Password"]').clear().type('password');
    cy.get('button[type="submit"]').click();
    cy.contains('Logout').should('be.visible');
  });

  it('creates a new item', () => {
    // Login first
    cy.get('input[placeholder="Username"]').clear().type('admin');
    cy.get('input[placeholder="Password"]').clear().type('password');
    cy.get('button[type="submit"]').click();

    // Create new item
    cy.get('input').type('Test Item');
    cy.get('button').contains('Add').click();
    cy.contains('Test Item').should('be.visible');
  });

  it('edits an existing item', () => {
    // Login first
    cy.get('input[placeholder="Username"]').clear().type('admin');
    cy.get('input[placeholder="Password"]').clear().type('password');
    cy.get('button[type="submit"]').click();

    // Add item to edit
    cy.get('input').type('Edit Me');
    cy.get('button').contains('Add').click();
    cy.contains('Edit Me').should('be.visible');

    // Edit the item
    cy.contains('Edit Me').parent().find('button').contains('Edit').click();
    cy.get('input').clear().type('New Edit');
    cy.get('button').contains('Save').click();
    cy.contains('New Edit').should('be.visible');
  });

  it('deletes an item', () => {
    // Login first
    cy.get('input[placeholder="Username"]').clear().type('admin');
    cy.get('input[placeholder="Password"]').clear().type('password');
    cy.get('button[type="submit"]').click();

    // Add item to delete
    cy.get('input').type('Delete Me');
    cy.get('button').contains('Add').click();

    // Delete the item
    cy.contains('Delete Me').find('button').contains('Delete').click();
    cy.contains('Delete Me').should('not.exist');
  });
});