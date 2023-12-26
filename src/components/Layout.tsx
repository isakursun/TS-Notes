import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types";

type LayoutProps = {
  notes: Note[];
};

const Layout = ({ notes }: LayoutProps) => {
  // urldeki id yi alma
  const { id } = useParams();

  // url deki not verisiyle eşleşen not var mı
  const found = notes.find((n) => n.id === id);

  // id ler eşleşmiyorsa kullanıcı anasayfaya yönlendir
  if (!found) return <Navigate to={"/"} />;

//  note bulunduysa bilgilerini alt route aktardık
  return <Outlet context={found} />;
};

export default Layout;
