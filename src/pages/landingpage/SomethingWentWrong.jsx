export default function SomethingWentWrong({retryFunction}) {
    return (
        <div className="Somethingwrong-container-Active">
            <div class="Somethingwrong-container">
                <div class="Somethingwrong-box Somethingwrong-error-state">
                    <div class="Somethingwrong-icon-wrapper Somethingwrong-error-icon-bg">
                        <span class="Somethingwrong-error-symbol">!</span>
                    </div>

                    <h3 class="Somethingwrong-title">Something went wrong</h3>
                    <p class="Somethingwrong-subtitle">Try again sometime</p>

                    <button class="Somethingwrong-action-btn Somethingwrong-btn-retry" id="Somethingwrong-retry-button" onClick={retryFunction}>
                        <i class="fas fa-redo Somethingwrong-btn-icon"></i> Retry Now
                    </button>
                </div>
            </div>
        </div>
    )
}
