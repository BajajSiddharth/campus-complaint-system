function SummaryCard({ title, value, color }) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#f9fafb",
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
      }}
    >
      <div style={{ fontSize: "14px", color: "#6b7280" }}>
        {title}
      </div>
      <div style={{ fontSize: "28px", fontWeight: "bold", color }}>
        {value}
      </div>
    </div>
  );
}

export default SummaryCard;
