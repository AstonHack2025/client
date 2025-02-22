const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <div suppressHydrationWarning>{children}</div>;
};

export default AuthLayout;
