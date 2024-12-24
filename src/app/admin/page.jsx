import { createClient } from "../../../utils/supabase/server";
import CardMahasiswa from "../components/CardMahasiswa";
import SearchForm from "../components/SearchForm";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClient();

  // Mengambil data user
  const { data: { user } } = await supabase.auth.getUser();

  // Mengambil data mahasiswa
  const { data: mahasiswa, error } = await supabase
    .from("mahasiswa")
    .select()
    .order("id", { ascending: true });

  if (error) {
    console.log("Error fetching mahasiswa:", error.message);
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Navbar */}
      <div className="w-full bg-gray-200 shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-pink-500">Admin - Data Mahasiswa</div>
        {/* Search Form */}
        <SearchForm />
      </div>

      {/* Main Section */}
      <div className="p-6 bg-gray-100 flex flex-col flex-1">
        {/* Button Tambah Mahasiswa */}
        <div className="flex justify-center mb-6">
          <Link href="/add-mahasiswa">
            <button className="bg-pink-500 text-white py-3 px-6 rounded-md font-medium shadow-md hover:bg-pink-600 transition duration-200">
              + Tambah Mahasiswa
            </button>
          </Link>
        </div>

        {/* Grid Data Mahasiswa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mahasiswa &&
            mahasiswa.map((mhs, idx) => (
              <div
                key={idx}
                className="shadow-md hover:shadow-2xl transform hover:scale-105 transition-shadow duration-300"
              >
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
