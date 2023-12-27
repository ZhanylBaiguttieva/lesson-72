import NavBar from './NavBar/NavBar';

const Admin = () => {
  let children;
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main className="container-fluid">
        {children}
      </main>
    </>
  );
};

export default Admin;