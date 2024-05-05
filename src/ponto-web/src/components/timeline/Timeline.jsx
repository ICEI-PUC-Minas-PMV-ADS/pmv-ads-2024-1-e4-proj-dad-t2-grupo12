import './Timeline.css';

const events = [
    { title: "09:10", date: "Turno de 04h 05m", type: "entrada" },
    { title: "12:05", date: "Intervalo de 01h 00m", type: "saida" },
    { title: "13:05", date: "Turno de 04h 05m", type: "entrada" },
    { title: "18:10", date: " ", type: "saida" }
];

const Timeline = () => {
    return (
        <div className="principal">
            <div className="timeline">
                {events.map((event, index) => (
                    <div className="timeline-item" key={index}>
                        <div className="timeline-content-inicial">
                            <div className="timeline-content-dot">
                                <div className={`timeline-dot ${event.type}`}></div>
                            </div>
                            <div className="timeline-content">
                                <h3>{event.title}</h3>
                            </div>
                        </div>
                        <div className="timeline-content-date">
                            <span className="timeline-date">{event.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
