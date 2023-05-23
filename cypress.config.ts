import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        /*env: {
            username: '', // fh usernae
            password: '',  // fh password
            firstname: '',  // profile firstname
            id: '',  // your profile id
        },*/
    },
});
