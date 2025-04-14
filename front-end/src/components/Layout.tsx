import React from 'react';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default Layout;