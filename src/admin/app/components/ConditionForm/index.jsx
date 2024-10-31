export default () => {
    return (
        <div className="condition-wrapper p-4 bg-[#F8FAFC] mt-3">
            <div className="condition mb-4">
                <div className="dropdown-menu gap-3">
                    <select className="list !w-[35%]" name="condition" id="condition">
                        <option value="condition1">Condition 1</option>
                        <option value="condition2">Condition 2</option>
                    </select>
                    <select className="list" name="is" id="is">
                        <option value="is">Is</option>
                        <option value="not">Is not</option>
                    </select>
                    <select className="list" name="true" id="true">
                        <option value="true">True</option>
                        <option value="fale">False</option>
                    </select>
                    <button type="button" className="delete">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.5" clip-path="url(#clip0_87_10850)">
                                <path d="M5.66634 7.7915C5.47848 7.7915 5.29831 7.86613 5.16547 7.99897C5.03264 8.13181 4.95801 8.31198 4.95801 8.49984C4.95801 8.6877 5.03264 8.86787 5.16547 9.0007C5.29831 9.13354 5.47848 9.20817 5.66634 9.20817H11.333C11.5209 9.20817 11.701 9.13354 11.8339 9.0007C11.9667 8.86787 12.0413 8.6877 12.0413 8.49984C12.0413 8.31198 11.9667 8.13181 11.8339 7.99897C11.701 7.86613 11.5209 7.7915 11.333 7.7915H5.66634Z" fill="#3C434A" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2913 8.49992C16.2913 12.803 12.8028 16.2916 8.49967 16.2916C4.19655 16.2916 0.708008 12.803 0.708008 8.49992C0.708008 4.19679 4.19655 0.708252 8.49967 0.708252C12.8028 0.708252 16.2913 4.19679 16.2913 8.49992ZM14.8747 8.49992C14.8747 9.3371 14.7098 10.1661 14.3894 10.9395C14.069 11.713 13.5995 12.4157 13.0075 13.0077C12.4155 13.5997 11.7127 14.0693 10.9393 14.3897C10.1658 14.71 9.33685 14.8749 8.49967 14.8749C7.6625 14.8749 6.83352 14.71 6.06007 14.3897C5.28662 14.0693 4.58384 13.5997 3.99187 13.0077C3.39989 12.4157 2.93032 11.713 2.60994 10.9395C2.28957 10.1661 2.12467 9.3371 2.12467 8.49992C2.12467 6.80916 2.79632 5.18766 3.99187 3.99211C5.18741 2.79657 6.80892 2.12492 8.49967 2.12492C10.1904 2.12492 11.8119 2.79657 13.0075 3.99211C14.203 5.18766 14.8747 6.80916 14.8747 8.49992Z" fill="#3C434A" />
                            </g>
                            <defs>
                                <clipPath id="clip0_87_10850">
                                    <rect width="17" height="17" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="btn-secondary">And</div>
        </div>
    )
}

