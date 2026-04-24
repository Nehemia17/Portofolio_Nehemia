import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqvitjflrxluyddakzau.supabase.co';
const supabaseKey = 'sb_publishable_vf0MnuvQLwicplVyYn2ycQ_LKE8YnrC';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Count:', data.length);
    if (data.length > 0) {
      console.log('First project keys:', Object.keys(data[0]));
      console.log('First project:', data[0]);
    } else {
      console.log('No projects found in the table.');
    }
  }
}

check();
