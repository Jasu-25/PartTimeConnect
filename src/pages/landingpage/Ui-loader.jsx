import './ui-loader.css';
export  function Uiloader() {
    return (
        <div className="Ui-loader-overlay">
            <div className="Ui-loader-content">
                <div className="Ui-loader-ring"></div>

                <div className="Ui-loader-image-wrapper">
                    <img src="logo.png"  alt="Loading..." className="Ui-loader-img" />
                </div>

                <p className="Ui-loader-text">PartTimeConnect</p>
            </div>
        </div>
    )
}
