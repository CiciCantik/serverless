import supabase from "../../utils/supabase";
import CardMahasiswa from "./components/CardMahasiswa";
import SearchForm from "./components/SearchForm";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar"; // Import Sidebar
import Link from "next/link";

export const revalidate = 20;

export default async function Home() {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getUser();
  console.log(data);

  if (authError || !data?.user) {
    redirect("/login");
  }

  const { data: mahasiswa, error } = await supabase
    .from("mahasiswa")
    .select()
    .order("id", { ascending: true });
  console.log(mahasiswa);

  if (error) {
    console.log(error.message);
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="w-full bg-gray-200 shadow-md py-4 px-6 flex justify-between items-center">
          {/* Logo / Judul */}
          <div className="text-2xl font-bold text-pink-500">Data Mahasiswa</div>

          {/* SearchForm */}
          <SearchForm />
        </div>

          {/* Grid Data Mahasiswa */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mahasiswa &&
              mahasiswa.map((mhs, idx) => (
                <div key={idx} className="shadow-md hover:shadow-2xl transform hover:scale-105 transition-shadow transform duration-300">
                  <CardMahasiswa
                    nim={mhs.nim}
                    nama={mhs.nama}
                    angkatan={mhs.angkatan}
                    prodi={mhs.prodi}
                    foto={mhs.foto}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
  );
}
