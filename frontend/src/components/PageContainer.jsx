function PageContainer({ title, children }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "24px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        marginTop: "16px"
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>{title}</h2>
      {children}
    </div>
  );
}

export default PageContainer;
