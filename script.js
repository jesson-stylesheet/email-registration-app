// Initialize Supabase client (replace with your own Supabase URL and public anon key)
const supabase = Supabase.createClient('YOUR_SUPABASE_URL', 'YOUR_PUBLIC_ANON_KEY');

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
