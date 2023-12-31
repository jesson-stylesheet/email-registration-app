// Initialize Supabase client (replace with your own Supabase URL and public anon key)
var supabase = supabase.createClient('https://qqilepmtenqjiivhsjhe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaWxlcG10ZW5xamlpdmhzamhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1NzcyMzcsImV4cCI6MjAxMjE1MzIzN30.P-R8tBy9jCedYMbcWyn2agEGWTDkD9Owmdz6LV8qnoc');

async function verifyEmail() {
    const email = document.getElementById('emailInput').value;
    const { data, error } = await supabase
        .from('emails')
        .select('*')
        .eq('email', email);

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    if (data.length === 0) {
        // Email not found in database, so we can register it
        await supabase
            .from('emails')
            .insert([{ email: email }]);
        document.getElementById('message').textContent = 'Success';
    } else {
        // Email already exists in database
        document.getElementById('message').textContent = 'Please use another email!';
    }
}

// Preventing the 'Submit' function on the button and add the verifyEmail function
document.addEventListener("DOMContentLoaded", function() {
    const emailForm = document.getElementById('email-form');
    emailForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting and the page from refreshing
        verifyEmail();
    });
});