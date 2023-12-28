import NavBar from '../NavBar/NavBar';

const Admin = () => {
  let children;
  return (
    <>
      <header>
        <NavBar/>
      </header>
      {children}
    </>
  );
};

export default Admin;