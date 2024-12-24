import { createClient } from '../../../utils/supabase/server';
import { redirect } from 'next/navigation';
import Sidebar from '../components/Sidebar';

export default async function AdminLayout({ children }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: roleData } = await supabase
        .from('roles')
        .select('role')
        .eq('user_id', user.id)
        .single()

        console.log(roleData.role);
        

    if (!roleData || roleData.role !== 'admin') {
        redirect('/')
    }

    return <>
      <div className='flex h-screen'>
        
      <Sidebar />
      {children}
      </div>
    </>
}