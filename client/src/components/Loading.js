const Loading = () => {
    return (
        <div className="absolute bg-white/70 z-10 h-screen w-screen flex justify-center align-middle">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading