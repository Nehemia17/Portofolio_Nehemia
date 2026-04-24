import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqvitjflrxluyddakzau.supabase.co';
const supabaseKey = 'sb_publishable_vf0MnuvQLwicplVyYn2ycQ_LKE8YnrC';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addProject() {
  const { data, error } = await supabase.from('projects').insert({
    Title: 'Desain Website Healthcare',
    Description: 'Sebuah desain website modern untuk layanan kesehatan.',
    Img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200'
  });

  if (error) {
    console.error('Error adding project:', error);
  } else {
    console.log('Project added successfully!');
  }
}

addProject();
