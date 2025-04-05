export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="px-11">
            <div className="w-full h-24 "></div>
            {children}
        </div>
    )
}