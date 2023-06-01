import "./Header.css";

export function Header() {
    return (
        <>
        <div className="header">
            <div className="container">
                <div>
                    <a href="/">FlashCardCentral</a>
                </div>

                <div>
                    <a href="/">Decks</a>
                </div>
                <div>
                    <a href="/login">Login</a>
                </div>
            </div>
        </div>
        </>
    )
    
}