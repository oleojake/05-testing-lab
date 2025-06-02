describe('Login specs', () => {
	it('visit the login page', () => {
		cy.visit('/');
	});

	it('should name input has the focus when it clicks on it', () => {
		// Arrange

		// Act
		cy.visit('/');
		cy.findByRole('textbox').click();

		// Assert
		cy.findByRole('textbox').should('have.focus');
	});

	it('should show an alert with a message when type invalid credentials', () => {
		// Arrange
		const user = 'admin';
		const password = '1234';


		// Act
		cy.visit('/');
		cy.findByRole('textbox').as('userInput');
		cy.findByLabelText(/contraseña/i).as('passwordInput');
		cy.get('@userInput').type(user);
		cy.get('@passwordInput').type(password);
		cy.findByRole('button', { name: 'Login' }).click();

		// Assert
		cy.get('@userInput').should('have.value', user);
		cy.get('@passwordInput').should('have.value', password);
		cy.contains('Usuario y/o password no válidos').should('be.visible');
	});

	it('should navigate to hotels url when type valid credentials', () => {
		// Arrange
		const user = 'admin';
		const password = 'test';

		// Act
		cy.visit('/');
		cy.findByRole('textbox').as('userInput');
		cy.findByLabelText(/contraseña/i).as('passwordInput');
		cy.get('@userInput').type(user);
		cy.get('@passwordInput').type(password);
		cy.findByRole('button', { name: 'Login' }).click();

		// Assert
		cy.url().should('equal', 'http://localhost:8080/#/submodule-list');
	});
});