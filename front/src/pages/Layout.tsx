import Components from "../components";

interface ILayout {
    children: any;
}

const Layout = ({ children }: ILayout) => {
    return (
        <div>
            <Components.Navbar />
            <main>{children}</main>
            <Components.Footer />
        </div>
    );
};

export default Layout;
