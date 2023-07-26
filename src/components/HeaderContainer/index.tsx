import { T } from '@tolgee/react'

const HeaderContainer = () => {
    return (
        <>
            <div className="header-container">
                <h1><T keyName="welcome" /></h1>
                <div className="status-strip">
                    <span className="date"></span>
                    <span> | </span>
                    <span className="time"></span>
                    <span> | </span>
                    <span className="weather">
                    </span>
                </div>
            </div>
        </>
    );
}

export default HeaderContainer;