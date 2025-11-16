import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, {
    global: {
        fetch: (input, init) => {
        console.log('➡️ Supabase request:');
        console.log('URL:', input);
        console.log('Headers:', init?.headers);
        console.log('Body:', init?.body);
        return fetch(input, init);
        },
    },
}
);

export default supabase;
