import Components from "@components";

import "@assets/scss/pages/Layout.scss";

interface ILayout {
    title?: string;
    children: any;
}

const Layout = ({ title, children }: ILayout) => {
    return (
        <div className="Layout">
            <Components.Sidebar />
            <main>
                <h1>{title || ""}</h1>
                <div className="Content">{children}</div>
            </main>
        </div>
    );
};

export default Layout;
