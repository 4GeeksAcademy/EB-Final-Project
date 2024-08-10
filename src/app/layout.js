import { Lato } from "next/font/google";
import "./globals.css";
import { getUser } from "@/services/getUser";
import { MyLink } from "@/components/MyLink";
import { Signout } from "@/components/Signout";
import { FaHome } from "react-icons/fa"; // Importa el icono de Home

const inter = Lato({ subsets: ["latin"], weight: "400" });

export default async function RootLayout({ children }) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-10/12 mx-auto flex flex-col">
          <div className="py-4 flex flex-row justify-between items-center border-b border-primary-dark">
            <div className="text-2xl font-bold text-blue-600">MyShifts</div>
            <div className="flex space-x-4">
              <MyLink href="/"><FaHome className="inline-block mr-2" />Home</MyLink>
              <MyLink href="/persons">Persons</MyLink>
              <MyLink href="/shifts">Shifts</MyLink>
              {user ? (
                <Signout user={user} className="text-primary-dark hover:text-primary" />
              ) : (
                <MyLink href="/login" className="text-primary-dark hover:text-primary">Login</MyLink>
              )}
            </div>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
