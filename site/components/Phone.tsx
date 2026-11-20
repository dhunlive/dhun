// An illustration of a voice party room, drawn in HTML so it stays sharp and
// weighs nothing. Decorative: the label says what it shows. Its chat is mixed
// Hindi and English on purpose, the way these rooms actually read.

const seats = [
  { initial: 'S', name: 'Sana', tone: 'a7', speaking: true, host: true },
  { initial: 'A', name: 'Arjun', tone: 'a2' },
  { initial: 'M', name: 'Meera', tone: 'a3', speaking: true },
  { initial: 'K', name: 'Kabir', tone: 'a4' },
  { initial: 'R', name: 'Riya', tone: 'a5' },
  { initial: 'D', name: 'Dev', tone: 'a6' },
  { initial: 'P', name: 'Pooja', tone: 'a1' },
];

export function Phone({ label }: { label: string }) {
  return (
    <div className="phone" role="img" aria-label={label}>
      <div className="screen" aria-hidden="true">
        <div className="room-head">
          <span className="avatar a7">S</span>
          <div className="room-title">
            <strong>Shaam ki mehfil</strong>
            <span>हिन्दी · ID 104821</span>
          </div>
          <span className="live-pill">LIVE</span>
        </div>
        <div className="seats">
          {seats.map((s) => (
            <div key={s.name} className={`seat ${s.speaking ? 'speaking' : ''}`}>
              <span className={`avatar ${s.tone}`}>{s.initial}</span>
              {s.host ? <span className="host-badge">{s.name}</span> : s.name}
            </div>
          ))}
          <div className="seat">
            <span className="avatar empty">+</span>Seat 8
          </div>
          <div className="seat">
            <span className="avatar empty">+</span>Seat 9
          </div>
        </div>
        <div className="chat">
          <p>
            <b>Riya</b> Kishore Kumar next?
          </p>
          <p>
            <b>Dev</b> भाई आवाज़ में जादू है
          </p>
          <p className="system">Vikram joined the room</p>
          <p>
            <b>Arjun</b> बहुत बढ़िया गाया
          </p>
          <p>
            <b>Pooja</b> One more song, please
          </p>
          <p className="gift">
            <b>Kabir</b> sent Rose ×10
          </p>
        </div>
        <div className="composer">
          <span>Say something…</span>
          <i>♪</i>
        </div>
      </div>
    </div>
  );
}
