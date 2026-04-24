import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqvitjflrxluyddakzau.supabase.co';
const supabaseKey = 'sb_publishable_vf0MnuvQLwicplVyYn2ycQ_LKE8YnrC';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProfiles() {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Profiles:', data);
  }
}

checkProfiles();
