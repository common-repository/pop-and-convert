const InfoCard = ({ children, title, content, link }) => {
    return <div className="col">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {children}
            </div>
        </div>
    </div>
}

export default InfoCard;
