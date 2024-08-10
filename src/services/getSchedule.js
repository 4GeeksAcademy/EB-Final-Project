// services/getSchedule.js
import { supabase } from '@/utils/supabase/client';

export const getSchedule = async () => {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('week', getCurrentWeek());

  if (error) {
    console.error('Error fetching schedule:', error);
    return [];
  }

  return data;
};

const getCurrentWeek = () => {
  const currentDate = new Date();
  const startOfWeek = currentDate.getDate() - currentDate.getDay();
  const endOfWeek = startOfWeek + 6;
  return `${startOfWeek}-${endOfWeek}`;
};
